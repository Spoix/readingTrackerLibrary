// Is the user using localStorage or firebase?
let userLocalStorage = "yes";
let fireBase;

let selectuserLocalStorage = document.querySelector("#local-storage");

if (userLocalStorage == "yes") {
    selectuserLocalStorage.setAttribute("style", "background-color: green", "color: white", "font-weight: bold")
}

if (localStorage.getItem("isLocal") == "yes" && localStorage.length > 2) {
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

function addBookToLibrary() {
    let bookTitle = document.querySelector("#title").value
    let bookAuthor = document.querySelector("#author").value
    let bookTPages = document.querySelector("#tpages").value
    let bookCPages = document.querySelector("#cpages").value
    let bookReadingState = document.querySelector("#is-read").checked ? true : false;
    let newBook = new Book(bookTitle, bookAuthor, bookTPages, bookCPages, bookReadingState);
    let booksAlreadyStoraged = [];
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("object")) {
            booksAlreadyStoraged.push(JSON.parse(localStorage.getItem(localStorage.key(i))).title)
        }
    }
    if (booksAlreadyStoraged.includes(bookTitle)) {
        alert("The book is already storaged.")
    } else {
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
            <button class="book-buttons" id="edit-book-button">Edit</button>
            <button class="book-buttons" id="delete-book-button" onclick="removeBook()">Delete</button>
        `;
        document.querySelector("#library-elements-container").appendChild(bookContent);
        localStorageSetting();
        myLibrary = [];
        document.querySelector("#add-book-form").setAttribute("style", "display: none");
        toggleVisibility();
    }
    
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
                <span class="book-specs" class="book-title" id = "bt">${bookToPrint.title}</span>
            </div>
            <div class="book-detail">BOOK'S AUTHOR<br>
                <span class="book-specs" class="book-title" id = "ba">${bookToPrint.author}</span>
            </div>
            <div class="book-detail">NUMBER OF PAGES<br>
                <span class="book-specs" class="book-total-pages" id = "tp">${bookToPrint.tpages}</span>
            </div>
            <div class="book-detail">CURRENT PAGE<br>
                <span class="book-specs" class="book-current-page" id = "cp">${bookToPrint.cpages}</span>
            </div>
            <div class="book-detail">BOOK STATUS<br>
                <span class="book-specs" class="book-status" id = "ir">${bookToPrint.isRead}</span>
            </div>
            <button class="book-buttons" id="edit-book-button" onclick="editBook()">Edit</button>
            <button class="book-buttons" id="delete-book-button" onclick="removeBook()">Delete</button>
        `;
        document.querySelector("#library-elements-container").appendChild(bookContent);
        }
    }
}

function removeBook () {
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes("object")) {
            let titleOnStorage = JSON.parse(localStorage.getItem(localStorage.key(i))).title
            let myBookTitle = document.querySelector("#delete-book-button").parentElement.firstElementChild.textContent.includes(titleOnStorage)
            if (myBookTitle) {
                localStorage.removeItem(localStorage.key(i))
            }
        }
    }
    document.querySelector("#delete-book-button").parentElement.remove()
}

function editBook () {
    let initialValues = {
        initTitle: document.querySelector("#bt"),
        initAuthor: document.querySelector("#ba"),
        initTp: document.querySelector("#tp"),
        initCp: document.querySelector("#cp"),
        initIr: document.querySelector("#ir")
    };
    let currentTitle = initialValues.initTitle.textContent
    Object.values(initialValues).forEach((el) => {
        el.setAttribute("contenteditable", "true");
        el.addEventListener("input", (e) => {
            if (e.target.id == "bt") {
                for (i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i).includes("object")) {
                        let storagedTitle = JSON.parse(localStorage.getItem(localStorage.key(i))).title
                        if (currentTitle == storagedTitle) {
                            let toChange = localStorage.key(i)
                            console.log(JSON.parse(localStorage.getItem(toChange)))
                            // localStorage.setItem(localStorage.key(i), JSON.stringify({title: "teste", author: "fad", tpages: "fd", cpages: "fda", isRead: "Not Read"}))
                        }
                    }
                }
            } else if (e.target.id == "ba") {
                console.log("autor")
            } else if (e.target.id == "tp") {
                console.log("totalp")
            } else if (e.target.id == "cp") {
                console.log("currentp")
            } else {
                console.log("isread")
            }

        })
    })
}