const apiUrl = "http://localhost:3000/books";

// Function to get books from API
async function getBooks() {
    try {
    const response = await fetch(apiUrl);
    const books = await response.json();
    displayBooks(books);
    } catch(error){
        console.error(error)
    }
    
}

// Function to display books in the list
function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    books.forEach(book => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = book.title;

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteBook(book.id);

        li.appendChild(deleteBtn);
        bookList.appendChild(li);
    });
}

//Function to add a new book
async function addBook(title) {
    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    getBooks();  // Refresh the list after adding
}

// Function to delete a book
async function deleteBook(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });
    getBooks();  // Refresh the list after deleting
}

// Handle form submission to  create a new book
document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const bookTitle = document.getElementById("book-title").value;
    addBook(bookTitle);
    document.getElementById("book-title").value = "";
});

// Initialize the book list on page load
getBooks();