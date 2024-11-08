document.getElementById("searchBooks").addEventListener("click", () => {
    const query = document.getElementById("query").value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const bookDisplay = document.getElementById("bookDisplay");
            if (data.totalItems > 0) {
                bookDisplay.innerHTML = data.items.map(book => {
                    const title = book.volumeInfo.title || "No title available";
                    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No authors available";
                    const description = book.volumeInfo.description || "No description available";
                    return `
                        <div class="book">
                            <h2>${title}</h2>
                            <p><strong>Authors:</strong> ${authors}</p>
                            <p><strong>Description:</strong> ${description}</p>
                        </div>
                    `;
                }).join("");
            } else {
                bookDisplay.innerHTML = `<p>No results found. Please try a different search.</p>`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("bookDisplay").innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
});
