/**
 * Creates a Book object from given variables. Title and author
 * take strings, pages is just the number of pages, and read is
 * a boolean.
 * @param {string} title -The title of the Book
 * @param {string} author -The name of the author
 * @param {(string|number)} pages -The number of pages
 * @param {boolean} [read = false] -Has this book been read
 */
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  /**
   * Gives info about the Book object as a string.
   */
  this.info = () =>
    `${this.title} by ${this.author}, ${this.pages}, ${
      this.read ? "finished reading" : "not read yet"
    }`;
  this.formattedInfo = () => {
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("div");

    bookTitle.textContent = `${this.title}`;
    bookAuthor.textContent = `by ${this.author}`;
    bookPages.textContent = `${this.pages} pages`;
    bookRead.textContent = `${this.read ? "✔" : "✘"}`;
    bookRead.classList.add(`${this.read ? "has-read" : "hasnt-read"}`);
    return [bookTitle, bookAuthor, bookPages, bookRead];
  };
}

/**
 * Takes given Book objects and pushes them into
 * the given Library array (An array of books).
 * @param {[]} library -Library array
 * @param  {...Book} books -One or more Book objects to add to the Library
 */
function addBooksToLibrary(library, ...books) {
  books.forEach((book) => {
    library.push(book);
  });
}

function turnIntoBookForm() {}

function makeNewButton() {
  const newButton = document.createElement("button");
  newButton.classList.add("new-book-button");
  newButton.textContent = "+";
  newButton.addEventListener("click", () => {
    turnIntoBookForm();
  });
  return newButton;
}

/**
 * Takes each Book in the Library and displays them on the bookshelf; clearing
 * the shelf before it does so in order to allow for updates to the Library.
 * @param {[]} library -Library array
 */
function displayLibrary(library) {
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.textContent = "";
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    const bookInfo = book.formattedInfo();
    bookCard.classList.add("book");
    bookInfo.forEach((info) => {
      bookCard.appendChild(info);
    });
    bookShelf.appendChild(bookCard);
  });
  const newButton = makeNewButton();
  bookShelf.appendChild(newButton);
}

const myLibrary = [];
const theHobblin = new Book("The Hobblin", "J.R.R. Arr", "2695");
const GOT = new Book("Game of Throws", "Wanna Bee", "2");
const thePres = new Book(
  "The President Who Lived",
  "J.F.K. Rowing",
  "1963",
  true
);
addBooksToLibrary(myLibrary, theHobblin, GOT, thePres);
displayLibrary(myLibrary);
