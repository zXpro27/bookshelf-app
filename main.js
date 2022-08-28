document.addEventListener("DOMContentLoaded", function () {

    const formInput = document.getElementById("inputBook");
    const formSearch = document.getElementById("searchBook");

    formInput.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    if (isStorageSupported()) {
        fetchJson();
    }
});

document.addEventListener("onjsonfetched", function () {
    renderFromBooks();
});

