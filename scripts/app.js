const myLibrary = [];

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

function displayLibrary(library) {
  const bookShelf = document.querySelector(".book-shelf");
  library.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.textContent = book.info();
    bookShelf.appendChild(bookCard);
  });
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295");
addBooksToLibrary(myLibrary, theHobbit);
displayLibrary(myLibrary);
