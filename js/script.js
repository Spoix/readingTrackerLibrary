// Is the user using localStorage or firebase?




// Function to toggle visiblity of main page when clicking buttons
function toggleVisibility() {
    let blur = document.querySelectorAll(".to-blur");
    blur.forEach(blur => blur.classList.toggle("active-blur"));
};

// Function to create form to add book
function createForm() {
    let addBookForm = document.querySelector("#add-book-form");
    addBookForm.setAttribute("style", "display: block");
    document.querySelectorAll("input[type=text]").forEach(input => input.setAttribute("required", ""));
};

// Button to close add new book form
let closeFormBtn = document.querySelector("#cancel");
closeFormBtn.addEventListener("click", () => {
    document.querySelector("#add-book-form").setAttribute("style", "display: none");
    toggleVisibility();
});

// Button to add new book on the form
let formAddNewBook = document.querySelector("#add").addEventListener("click", addBookToLibrary);


// Buttons that toggle visibility of main page
// Add new book button
document.querySelector("#add-book").addEventListener("click", () => {
    toggleVisibility();
    createForm();
});

// Selet the method to store data (local ou on database)
function configFunc() {
    let popup = document.querySelector(".pop-up-config-storage");
    let styles = getComputedStyle(popup);
    if (styles.display == "none") {
        popup.style.display = "inline-block"
    } else {
        popup.style.display = "none"
    }   
    let blur = document.querySelectorAll(".config-to-blur");
    blur.forEach(blur => blur.classList.toggle("active-blur"));
}


// Book storage functionality

let myLibrary = [];

function Book(title, author, tpages, cpages, isRead) {
    this.title = title;
    this.author = author;
    this.tpages = tpages;
    this.cpages = cpages;
    this.isRead = isRead ? true : false;
}

function addBookToLibrary() {
    let bookTitle = document.querySelector("#title").value
    let bookAuthor = document.querySelector("#author").value
    let bookTPages = document.querySelector("#tpages").value
    let bookCPages = document.querySelector("#cpages").value
    let bookReadingState = document.querySelector("#is-read").checked ? true : false;
    let newBook = new Book(bookTitle, bookAuthor, bookTPages, bookCPages, bookReadingState);
    myLibrary.push(newBook);
    localStorage.setItem(bookTitle, JSON.stringify(myLibrary));
    /* Para transformar de string de volta em objeto: SON.parse(localStorage.getItem("Dom Quitoxe"))[0]; */

}



