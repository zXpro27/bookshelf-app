const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";

function addBook() {
    const idBook = +new Date();
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = composeBookObject(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    books.unshift(bookObject);

    if (inputBookIsComplete) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }

    updateJson();
}

function createBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
    const book = document.createElement("div");
    book.setAttribute("id", idBook)

    const bookTitle = document.createElement("h3");
    bookTitle.style.fontSize = "16px";
    bookTitle.innerText = inputBookTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.style.maxWidth = "200px";
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement("p");
    bookYear.innerText = inputBookYear;

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(inputBookIsComplete, idBook);

    cardContent.append(bookTitle, bookAuthor, bookYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    book.append(cardContainer);

    return book;
}

function addAction(inputBookIsComplete, idBook) {
    const cardActions = document.createElement("div");
    cardActions.classList.add('action');

    const actionDelete = createActionDelete(idBook);
    const actionRead = createActionRead(idBook);
    const actionUndo = createActionUndo(idBook);

    cardActions.append(actionDelete);

    if (inputBookIsComplete) {
        cardActions.append(actionUndo);
    } else {
        cardActions.append(actionRead);
    }

    return cardActions;
}

function createActionDelete(idBook) {
    const actionDelete = document.createElement("button");
    actionDelete.innerText = 'Hapus';

    actionDelete.addEventListener("click", function () {
        let confirmation = confirm("apakah anda yakin ingin menghapus buku?");

        if (confirmation) {
            const cardParent = document.getElementById(idBook);
            cardParent.addEventListener("eventDelete", function (event) {
                event.target.remove();
            });
            cardParent.dispatchEvent(new Event("eventDelete"));

            deleteBookFromJson(idBook);
            updateJson();
        }
    });

    return actionDelete;
}

function createActionRead(idBook) {
    const action = document.createElement("button");
    action.innerText = 'Dibaca';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h3").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > p")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > p")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.unshift(bookObject);
        updateJson();
    })

    return action;
}

function createActionUndo(idBook) {
    const action = document.createElement("button");
    action.innerHTML = 'ulang';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h3").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > p")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > p")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.unshift(bookObject);
        updateJson();
    })

    return action;
}
