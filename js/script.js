// Function to toggle visiblity of main page when clicking buttons
function toggleVisibility() {
    let blur = document.querySelectorAll(".to-blur");
    blur.forEach(blur => blur.classList.toggle("active-blur"));
};

// Function to create form to add book
function createForm() {
    let addBookForm = document.querySelector("#add-book-form");
    addBookForm.setAttribute("style", "display: block");
};

// Button to close add new book form
let closeFormBtn = document.querySelector("#cancel");
closeFormBtn.addEventListener("click", () => {
    document.querySelector("#add-book-form").setAttribute("style", "display: none");
    toggleVisibility();
});


// Buttons that toggle visibility of main page
// Add new book button
document.querySelector("#add-book").addEventListener("click", () => {
    toggleVisibility();
    createForm();
});




