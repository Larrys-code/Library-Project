const library = (() => {
  const lib = [];

  const add = (...books) => {
    books.forEach((book) => {
      lib.push(book);
    });
    library.updateIndex();
  };

  const remove = (index) => {
    lib.splice(index, 1);
    library.updateIndex();
  };

  const updateIndex = () => {
    lib.forEach((book, index) => {
      book.setIndex(index);
    });
  };

  const getBooks = () => [...lib];

  return { add, remove, getBooks, updateIndex };
})();

const bookShelf = (() => {
  const shelf = document.querySelector(".book-shelf");
  const displayBook = (book) => {
    const bookCard = book.makeBookCard();
    shelf.appendChild(bookCard);
  };
  const displayAll = () => {
    shelf.textContent = "";
    const books = library.getBooks();
    books.forEach((book) => {
      displayBook(book);
    });
  };
  const remove = (element) => {
    shelf.removeChild(element);
  };
  const append = (element) => {
    shelf.appendChild(element);
  };
  return { displayAll, displayBook, remove, append };
})();

const makeElement = (() => {
  const deleteBookButton = (cancel = false) => {
    const newButton = document.createElement("button");
    newButton.classList.add("delete-book-button");
    newButton.textContent = "×";
    if (!cancel) {
      newButton.addEventListener("click", function deleteOnClick() {
        const clickedBook = this.parentElement;
        const bookIndex = clickedBook.getAttribute("data-index");
        library.remove(bookIndex);
        makeElement.displayAll();
      });
      return newButton;
    }
    newButton.addEventListener("click", function cancelOnClick() {
      const clickedForm = this.parentElement;
      const newNewBookButton = newBookButton();
      bookShelf.remove(clickedForm);
      bookShelf.append(newNewBookButton);
    });
    return newButton;
  };

  const makeInputDiv = (type, name) => {
    const inputDiv = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.setAttribute("type", `${type}`);
    input.setAttribute("name", `${name}`);
    input.setAttribute("id", `${name}`);
    label.setAttribute("for", `${name}`);
    switch (name) {
      case "author":
        label.textContent = "Author:";
        break;
      case "pages":
        label.textContent = "Pages:";
        break;
      case "title":
        label.textContent = "Title:";
        break;
      case "read":
        label.textContent = "Read:";
        break;
      default:
    }
    inputDiv.classList.add("input-container", `${type}`);
    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
    return inputDiv;
  };

  const makeFormFromButton = () => {
    const formCard = document.createElement("div");
    const bookForm = document.createElement("form");
    const submitButton = document.createElement("button");

    const cancelButton = deleteBookButton(true);
    formCard.appendChild(cancelButton);

    submitButton.textContent = "Add Book";
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const formData = new FormData(bookForm);
      const formObject = Object.fromEntries(formData);
      const isRead = !!formObject.read;
      const addBook = newBook({
        title: formObject.title,
        author: formObject.author,
        pages: formObject.pages,
        hasRead: isRead,
      });
      library.add(addBook);
      makeElement.displayAll();
    });

    formCard.classList.add("book", "book-form");
    bookForm.setAttribute("id", "new-book");
    bookForm.appendChild(makeInputDiv("text", "title"));
    bookForm.appendChild(makeInputDiv("text", "author"));
    bookForm.appendChild(makeInputDiv("number", "pages"));
    bookForm.appendChild(makeInputDiv("checkbox", "read"));
    bookForm.appendChild(submitButton);

    formCard.appendChild(bookForm);
    bookShelf.append(formCard);
  };

  const newBookButton = () => {
    const newButton = document.createElement("button");
    newButton.classList.add("new-book-button");
    newButton.textContent = "+";

    // Make a book form in place of the Button
    newButton.addEventListener("click", function turnIntoBookForm() {
      bookShelf.remove(this);
      makeFormFromButton();
    });
    return newButton;
  };

  const displayAll = () => {
    bookShelf.displayAll();
    bookShelf.append(newBookButton());
  };

  return { deleteBookButton, displayAll };
})();

const newBook = ({ title, author, pages, hasRead = false }) => {
  let read = hasRead;
  let index;
  const formattedInfo = () => {
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("div");

    bookTitle.textContent = `${title}`;
    bookAuthor.textContent = `by ${author}`;
    bookPages.textContent = `${pages} pages`;
    bookRead.textContent = `${read ? "✔" : "✘"}`;
    bookRead.classList.add(`${read ? "has-read" : "hasnt-read"}`);
    bookRead.classList.add("read-marker");
    return [bookTitle, bookAuthor, bookPages, bookRead];
  };
  const toggleRead = () => {
    switch (read) {
      case true:
        read = false;
        break;
      case false:
        read = true;
        break;
      default:
        break;
    }
  };
  const setIndex = (newIndex) => {
    index = newIndex;
  };
  const getIndex = () => index;
  const makeBookCard = () => {
    const bookCard = document.createElement("div");
    const bookInfo = formattedInfo();
    const deleteButton = makeElement.deleteBookButton();
    bookCard.appendChild(deleteButton);
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index", `${index}`);
    bookInfo.forEach((info) => {
      bookCard.appendChild(info);
    });
    bookCard.addEventListener("click", function toggleOnClick() {
      const readDiv = this.querySelector(".read-marker");
      readDiv.setAttribute("class", "read-marker");
      toggleRead();
      readDiv.textContent = `${read ? "✔" : "✘"}`;
      readDiv.classList.add(`${read ? "has-read" : "hasnt-read"}`);
    });
    return bookCard;
  };
  return { toggleRead, formattedInfo, makeBookCard, setIndex, getIndex };
};

// const theHobblin = Book("The Hobblin", "J.R.R. Arr", "2695");
// const GOT = Book("Game of Throws", "Wanna Bee", "2");
// const pres = Book("The President Who Lived", "J.F.K. Rowing", "1963", true);
// const nine = Book("1985", "Jeff", "1984", true);

library.add(
  newBook({
    title: "The Hobblet",
    author: "J.R.R. Ar",
    pages: "2675",
    hasRead: true,
  }),
  newBook({
    title: "The Hobblin",
    author: "J.R.R. Arr",
    pages: "2695",
  }),
  newBook({
    title: "Game of Throws",
    author: "Wanna Bee",
    pages: "2",
  }),
  newBook({
    title: "The President Who Lived",
    author: "J.F.K. Rowing",
    pages: "1963",
    hasRead: true,
  }),
  newBook({
    title: "1985",
    author: "Jeff",
    pages: "1984",
    hasRead: true,
  })
);
makeElement.displayAll();
