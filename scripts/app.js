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
    bookRead.classList.add("read-marker");
    return [bookTitle, bookAuthor, bookPages, bookRead];
  };
  this.toggleRead = () => {
    switch (this.read) {
      case true:
        this.read = false;
        break;
      case false:
        this.read = true;
        break;
      default:
    }
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

function turnIntoBookForm(library) {}

function makeNewButton(library) {
  const newButton = document.createElement("button");
  newButton.classList.add("new-book-button");
  newButton.textContent = "+";
  newButton.addEventListener("click", () => {
    turnIntoBookForm(library);
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

  library.forEach((book, index) => {
    const bookCard = document.createElement("div");
    const bookInfo = book.formattedInfo();

    const deleteButton = function makeDeleteButton() {
      const newButton = document.createElement("button");
      newButton.classList.add("delete-book-button");
      newButton.textContent = "x";
      newButton.addEventListener("click", function deleteOnClick() {
        const clickedBook = this.parentElement;
        const bookIndex = clickedBook.getAttribute("index");
        library.splice(bookIndex, 1);
        displayLibrary(library);
      });
      return newButton;
    };

    bookCard.appendChild(deleteButton());
    bookCard.classList.add("book");
    bookCard.setAttribute("index", `${index}`);

    bookInfo.forEach((info) => {
      bookCard.appendChild(info);
    });

    bookCard.addEventListener("click", function toggleRead() {
      const readDiv = this.querySelector(".read-marker");
      readDiv.setAttribute("class", "read-marker");
      book.toggleRead();
      readDiv.textContent = `${book.read ? "✔" : "✘"}`;
      readDiv.classList.add(`${book.read ? "has-read" : "hasnt-read"}`);
    });

    bookShelf.appendChild(bookCard);
  });

  const newButton = makeNewButton(library);
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
const test = new Book("The President Who Lived", "J.F.K. Rowing", "1963", true);
addBooksToLibrary(
  myLibrary,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  theHobblin,
  GOT,
  thePres,
  test
);
displayLibrary(myLibrary);
