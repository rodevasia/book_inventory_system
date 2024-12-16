# Book Inventory App

## Overview
The **Book Inventory App** is a simple web application for managing a collection of books. It allows users to view a paginated table of books, and perform basic CRUD operations such as updating and deleting entries. The application does not include user authentication, making it quick and easy to use.

## Features
- **View Books**: Displays a table of books with the following details:
  - Title
  - Author
  - Genre
  - Publication Date
  - ISBN
- **Update Books**: Modify the details of any book entry.
- **Delete Books**: Remove a book from the inventory.
- **Pagination**: Paginate the book list to improve usability and performance.

## Tech Stack
### Backend:
- **Django**: Framework for building the REST API.
- **Django REST Framework (DRF)**: Simplifies API development and serialization.

### Frontend:
- **React**: Framework for building the interactive user interface.
- **Axios**: For making API requests.

### Database:
- **SQLite**: Lightweight database for development.

## Installation

### Prerequisites
- Python (>=3.8)
- Node.js and npm

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rodevasia/book_inventory_system
   cd book_inventory_system
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

4. Open the app in your browser at `http://localhost:3000`.

## API Endpoints
The app uses the following API endpoints:
- **GET /api/books/**: Fetch a paginated list of books.
- **PUT /api/books/:id/**: Update a book.
- **DELETE /api/books/:id/**: Delete a book.

## Usage
1. Start both the backend and frontend servers.
2. Open the app in your browser.
3. View the list of books in a paginated table.
4. Use the edit and delete buttons to modify or remove books.

## Screenshots
- **Books Table**: Paginated list of books with update and delete options.

## Future Enhancements
- Add authentication for secure access.
- Implement a search bar for filtering books.
- Add support for exporting book data (e.g., CSV or JSON).

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

