


const toggleSwitch = document.querySelector('.toggle-btn input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }
}


const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
// languages

var english = document.getElementById("en"),
    french = document.getElementById("fr"),
    change_text = document.getElementById("trans-header");
// declare some variables to catch the various HTML elements

english.addEventListener("click", function () {
    change(english, french);
}, false
);
// add an event listener to listen to when the user clicks on one of the language span tags
// this triggers our custom "change" function, which we will define later

french.addEventListener("click", function () {
    change(french, english);
}, false
);


function change(lang_on, lang_off1) {
    if (!lang_on.classList.contains("current_lang")) {
        // if the span that the user clicks on does not have the "current_lang" class
        lang_on.classList.add("current_lang");
        // add the "current_lang" class to it
        lang_off1.classList.remove("current_lang");
        // remove the "current_lang" class from the other span
    }

    if (lang_on.innerHTML == "EN") {
        change_text.classList.add("english");
        change_text.classList.remove("french");
        change_text.innerHTML = "Hey, I'm Sulaiman";
    }

    else if (lang_on.innerHTML == "FR") {
        change_text.classList.add("french");
        // first line adds the corrent language class to the text
        change_text.classList.remove("english");
        // second and third line removes the other language classes
        // this allows you to apply CSS that is specific to each language
        change_text.innerHTML = "Coucou, C'est Sulaiman";
    }

}

// dropdown button functionality is disabled for now as its not neede in the design
// instead we are using the slider button to change the theme color

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown if the user clicks outside of it
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }