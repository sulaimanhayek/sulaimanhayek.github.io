


// toggle the calendar
function myFunction() {
    var x = document.getElementsById("stats");
    if (x.style.display === "none") {
        x.style.display === "block";
    }
    else {
        x.style.display === "block";
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