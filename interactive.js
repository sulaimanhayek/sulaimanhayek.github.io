// Traffic-light controls for the intro window: close, minimise, fullscreen.
(() => {
  const win = document.getElementById('mac-window');
  const stage = document.getElementById('window-stage');
  const dock = document.getElementById('dock');
  if (!win || !stage || !dock) return;

  const dockIcon = dock.querySelector('.dock-item');
  let hiddenAs = null; // 'minimize' | 'close' | null
  let restingHeight = 0;

  const isFullscreen = () => win.classList.contains('is-fullscreen');

  // Pin the window to the box it currently occupies, so it can fly into the
  // dock while the section it lived in collapses behind it.
  function detach() {
    const box = win.getBoundingClientRect();
    restingHeight = box.height;
    win.style.top = `${box.top}px`;
    win.style.left = `${box.left}px`;
    win.style.width = `${box.width}px`;
    win.style.height = `${box.height}px`;
    win.classList.add('is-detached');
  }

  function attach() {
    win.classList.remove('is-detached', 'is-minimizing', 'is-closing', 'is-restoring');
    win.style.cssText = '';
  }

  // Scaling about the dock icon is what makes the window converge on it.
  function aimAtDock() {
    const box = win.getBoundingClientRect();
    const icon = dockIcon.getBoundingClientRect();
    win.style.transformOrigin =
      `${icon.left + icon.width / 2 - box.left}px ${icon.top + icon.height / 2 - box.top}px`;
  }

  function play(animation, reverse) {
    win.classList.remove('is-minimizing', 'is-closing', 'is-restoring');
    void win.offsetWidth; // restart the animation
    win.classList.add(animation);
    if (reverse) win.classList.add('is-restoring');
  }

  function onceAnimated(done) {
    win.addEventListener('animationend', function end(event) {
      if (event.target !== win) return;
      win.removeEventListener('animationend', end);
      done();
    });
  }

  function setFullscreen(on) {
    if (on === isFullscreen()) return;
    if (on) stage.style.height = `${win.offsetHeight}px`;
    win.classList.toggle('is-fullscreen', on);
    document.body.classList.toggle('window-fullscreen', on);
    if (!on && !hiddenAs) stage.style.height = '';
  }

  function hide(mode) {
    if (hiddenAs) return;
    setFullscreen(false);
    hiddenAs = mode;

    stage.style.height = `${win.offsetHeight}px`;
    detach();
    dock.classList.add('is-open');
    if (mode === 'minimize') aimAtDock();

    void stage.offsetWidth; // collapse from the pinned height, not from auto
    stage.classList.add('is-collapsing');
    stage.style.height = '0px';

    play(mode === 'minimize' ? 'is-minimizing' : 'is-closing');
    onceAnimated(() => { win.style.display = 'none'; });
  }

  function restore() {
    if (!hiddenAs) return;
    const mode = hiddenAs;
    hiddenAs = null;

    win.style.display = '';
    if (mode === 'minimize') aimAtDock();
    dock.classList.remove('is-open');
    stage.style.height = `${restingHeight}px`;

    play(mode === 'minimize' ? 'is-minimizing' : 'is-closing', true);
    onceAnimated(() => {
      attach();
      stage.classList.remove('is-collapsing');
      stage.style.height = '';
    });
  }

  const actions = {
    close: () => hide('close'),
    minimize: () => hide('minimize'),
    fullscreen: () => setFullscreen(!isFullscreen()),
  };

  win.querySelectorAll('[data-window-action]').forEach((dot) => {
    const run = actions[dot.dataset.windowAction];
    dot.addEventListener('click', run);
    dot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        run();
      }
    });
  });

  dockIcon.addEventListener('click', restore);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (isFullscreen()) setFullscreen(false);
    else restore();
  });

  // A pinned height only matches the layout it was measured in.
  window.addEventListener('resize', () => {
    if (!hiddenAs && !isFullscreen()) stage.style.height = '';
  });
})();
