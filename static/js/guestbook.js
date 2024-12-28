document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("guestbook-form");
    const messageInput = document.getElementById("guest-message");
    const entriesList = document.getElementById("entries-list");

    // Load existing entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("guestbookEntries")) || [];
    savedEntries.forEach(addEntryToDOM);

    // Add form submission event
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const message = messageInput.value.trim();

        if (message) {
            // Save to localStorage
            savedEntries.push(message);
            localStorage.setItem("guestbookEntries", JSON.stringify(savedEntries));

            // Add entry to DOM
            addEntryToDOM(message);

            // Clear the input field
            messageInput.value = "";
        }
    });

    function addEntryToDOM(message) {
        const li = document.createElement("li");
        li.textContent = message;
        entriesList.appendChild(li);
    }
});