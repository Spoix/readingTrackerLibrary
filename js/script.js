// Is the user using localStorage or firebase?
let userLocalStorage = "yes";
let fireBase;

let selectuserLocalStorage = document.querySelector("#local-storage");

if (userLocalStorage == "yes") {
    selectuserLocalStorage.setAttribute("style", "background-color: green", "color: white", "font-weight: bold")
}

if (localStorage.getItem("isLocal") == "yes") {
    printAllBooks();
}




selectuserLocalStorage.addEventListener("click", () =>{
    if (userLocalStorage == null) {
        userLocalStorage = "yes"
        localStorage.setItem("isLocal", userLocalStorage)
        selectuserLocalStorage.setAttribute("style", "background-color: green", "color: white", "font-weight: bold")
        fireBase = null;
        localStorage.setItem("isFire", fireBase)
        selectFireBase.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    } else if (userLocalStorage == "yes") {
        userLocalStorage = null
        localStorage.setItem("isLocal", userLocalStorage)
        selectuserLocalStorage.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    }
});

let selectFireBase = document.querySelector("#cloud-storage");
selectFireBase.addEventListener("click", () => {
    if (fireBase == null) {
        fireBase = "yes"
        localStorage.setItem("isFire", fireBase)
        selectFireBase.setAttribute("style", "background-color: green", "color: white", "font-weight: bold")
        userLocalStorage = null;
        localStorage.setItem("isLocal", userLocalStorage)
        selectuserLocalStorage.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    } else if (fireBase == "yes") {
        fireBase = null
        localStorage.setItem("isFire", fireBase)
        selectFireBase.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    }
})

let cancelSelection = document.querySelector("#cancel-selection");
cancelSelection.addEventListener("click", () => {
    userLocalStorage = null;
    fireBase = null;
    selectFireBase.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    selectuserLocalStorage.setAttribute("style", "background-color: white", "color: black", "font-weight: normal")
    configFunc();
})

let closeSelection = document.querySelector("#close-window");
closeSelection.addEventListener("click", () => {
    configFunc();
})





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
    this.isRead = isRead ? "Read" : "Not Read";
}

let aBookName;

function addBookToLibrary() {
    let bookTitle = document.querySelector("#title").value
    let bookAuthor = document.querySelector("#author").value
    let bookTPages = document.querySelector("#tpages").value
    let bookCPages = document.querySelector("#cpages").value
    let bookReadingState = document.querySelector("#is-read").checked ? true : false;
    let newBook = new Book(bookTitle, bookAuthor, bookTPages, bookCPages, bookReadingState);
    myLibrary.push(newBook);
    let bookContent = document.createElement("div");
    bookContent.classList.add("book-description");
    bookContent.innerHTML = `
        <div class="book-detail">BOOK'S TITLE<br>
            <span class="book-specs" class="book-title">${newBook.title}</span>
        </div>
        <div class="book-detail">BOOK'S AUTHOR<br>
            <span class="book-specs" class="book-title">${newBook.author}</span>
        </div>
        <div class="book-detail">NUMBER OF PAGES<br>
            <span class="book-specs" class="book-total-pages">${newBook.tpages}</span>
        </div>
        <div class="book-detail">CURRENT PAGE<br>
            <span class="book-specs" class="book-current-page">${newBook.cpages}</span>
        </div>
        <div class="book-detail">BOOK STATUS<br>
            <span class="book-specs" class="book-status">${newBook.isRead}</span>
        </div>
        <div>
            <button class="edit-book-button">Edit</button>
        </div>
    `;
    document.querySelector("#library-elements-container").appendChild(bookContent);
    localStorageSetting();
}

function localStorageSetting() {
        let initialCounter = 0;
        myLibrary.forEach((book) => {
            localStorage.setItem(`${localStorage.length+1}${book}`, JSON.stringify(myLibrary[initialCounter]));
            initialCounter += 1;
        });
}



function printAllBooks() {
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("object")) {
            let bookContent = document.createElement("div");
            bookContent.classList.add("book-description");
            let bookToPrint = JSON.parse(localStorage.getItem(localStorage.key(i)))
            bookContent.innerHTML = `
            <div class="book-detail">BOOK'S TITLE<br>
                <span class="book-specs" class="book-title">${bookToPrint.title}</span>
            </div>
            <div class="book-detail">BOOK'S AUTHOR<br>
                <span class="book-specs" class="book-title">${bookToPrint.author}</span>
            </div>
            <div class="book-detail">NUMBER OF PAGES<br>
                <span class="book-specs" class="book-total-pages">${bookToPrint.tpages}</span>
            </div>
            <div class="book-detail">CURRENT PAGE<br>
                <span class="book-specs" class="book-current-page">${bookToPrint.cpages}</span>
            </div>
            <div class="book-detail">BOOK STATUS<br>
                <span class="book-specs" class="book-status">${bookToPrint.isRead}</span>
            </div>
            <button class="book-buttons" id="edit-book-button">Edit</button>
            <button class="book-buttons" id="delete-book-button" onclick="removeBook()">Delete</button>
        `;
        document.querySelector("#library-elements-container").appendChild(bookContent);
    }
    }
}

function removeBook () {
    document.querySelector("#delete-book-button").parentElement.remove()
}
