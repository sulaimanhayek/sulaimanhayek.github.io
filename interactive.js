// Traffic-light controls for the intro window: close, minimise, fullscreen.
(() => {
  const win = document.getElementById('mac-window');
  const stage = document.getElementById('window-stage');
  const dock = document.getElementById('dock');
  if (!win || !stage || !dock) return;

  let hidden = false;

  // Freeze the stage at the window's current height so hiding or detaching
  // the window leaves an empty area instead of collapsing the page.
  const lockStage = () => { stage.style.minHeight = `${win.offsetHeight}px`; };
  const freeStage = () => { stage.style.minHeight = ''; };

  const isFullscreen = () => win.classList.contains('is-fullscreen');

  function setFullscreen(on) {
    if (on === isFullscreen()) return;
    if (on) lockStage();
    win.classList.toggle('is-fullscreen', on);
    document.body.classList.toggle('window-fullscreen', on);
    if (!on && !hidden) freeStage();
  }

  function hide(mode) {
    if (hidden) return;
    setFullscreen(false);
    lockStage();
    hidden = true;
    win.classList.add('is-hidden', mode);
    dock.classList.add('is-open');
  }

  function restore() {
    if (!hidden) return;
    hidden = false;
    win.classList.remove('is-hidden', 'is-closed', 'is-minimized');
    dock.classList.remove('is-open');
    freeStage();
  }

  const actions = {
    close: () => hide('is-closed'),
    minimize: () => hide('is-minimized'),
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

  dock.querySelector('.dock-item').addEventListener('click', restore);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (isFullscreen()) setFullscreen(false);
    else restore();
  });

  // A locked height only matches the layout it was measured in.
  window.addEventListener('resize', () => {
    if (!hidden && !isFullscreen()) freeStage();
  });
})();
