# Books Catalogue

A web-based Single Page Application (SPA) for managing a personal library of books. This project interacts with a RESTful API to allow users to view, add, search, and manage a collection of book records.

## 📖 Project Overview

This application serves as a frontend client for a Books API. Upon launching the application, the user identifies themselves via a "Roll Number" (acts as a unique user ID), which loads their specific collection. Users can navigate between a main catalogue view and a search interface without reloading the page.

## ✨ Features

*   **User Identification:** Prompts user for an 8-digit Roll Number (or 6-digit random number) to load persistent data specific to that user.
*   **Browse Catalogue:** Fetches and displays books in a responsive, card-based grid layout including cover image, title, author, and price.
*   **Add Books:** A form interface to add new books to the collection with duplicate detection.
*   **Search Functionality:** dynamic search feature allowing users to find books by keywords (Title or Author).
*   **Delete Functionality:** *[Missing from Server side]* Interface to remove books from the collection.
*   **Responsive Design:** styled with CSS Flexbox for a clean user interface. *[Needs improvement]*

## 🛠️ Tech Stack

*   **Frontend:** HTML5, CSS3
*   **Logic:** Vanilla JavaScript (ES6+)
*   **Data Handling:** Fetch API (Async/Await) for CRUD operations
*   **API Endpoint:** `https://assignment3.rohanhussain.com/api/books/`

## 🚀 How to Run

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/books-catalogue.git
    ```
2.  Navigate to the project directory.
3.  Open `index.html` in any modern web browser.
4.  Enter a valid 6 or 8-digit number when prompted to start managing your catalogue.

## 📂 Project Structure

*   `index.html`: Main entry point containing the structure for Catalogue and Search pages.
*   `styles.css`: Custom styling for layout, cards, and navigation.
*   `code.js`: Handles DOM manipulation, API requests (GET, POST, DELETE), and page navigation logic.

## 👤 Author

**Muhammad Waleed Barki**
