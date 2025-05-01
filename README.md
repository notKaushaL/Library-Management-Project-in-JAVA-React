# Library Management System

A complete Library Management System with a Spring Boot backend and React frontend designed to manage books, users, and borrowing operations in a library environment.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
  - [Backend Structure](#backend-structure)
  - [Frontend Structure](#frontend-structure)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
- [Business Logic](#business-logic)
- [Getting Started](#getting-started)
- [Database Access](#database-access)
- [License](#license)

## Overview

This Library Management System provides a full-featured solution for managing library resources. It enables librarians to maintain book inventory, manage user accounts, and track borrowing/returning activities through an intuitive interface.

## Features

- **Books Management**: Add, update, delete, and list books with details
- **User Management**: Register, update, and manage library users
- **Borrowing System**: Track book borrowing and returns with timestamps
- **REST API**: Full RESTful API for all operations
- **H2 Database**: In-memory database for demo purposes
- **Swagger UI**: Interactive API documentation

## Technology Stack

### Backend
- Java 8
- Spring Boot 2.7.x (Web, Data JPA, Validation)
- Spring Data JPA for database operations
- H2 Database (in-memory)
- Swagger/Springfox for API documentation
- Gradle for build management
- Lombok for reducing boilerplate code

### Frontend
- React 18
- React Router 6 for navigation
- Axios for API communication
- Bootstrap 5 for responsive UI
- Node.js/npm for package management

## Project Structure

### Backend Structure

The backend is organized following the standard Spring MVC architecture:

```
src/main/java/com/management/library/
├── controller/          # REST API controllers
│   ├── BookController.java       # Book-related endpoints
│   ├── UserController.java       # User-related endpoints
│   ├── BorrowController.java     # Borrowing-related endpoints
│   └── HomeController.java       # Main/Home page controller
├── model/               # Entity models (JPA entities)
│   ├── Book.java                 # Book entity
│   ├── User.java                 # User entity
│   └── BorrowRecord.java         # Borrowing record entity
├── repository/          # JPA repositories
│   ├── BookRepository.java       # Book data access
│   ├── UserRepository.java       # User data access
│   └── BorrowRecordRepository.java # Borrowing records data access
├── service/             # Business logic layer
│   ├── BookService.java          # Book-related business logic
│   ├── UserService.java          # User-related business logic
│   └── BorrowService.java        # Borrowing-related business logic
├── config/              # Configuration classes
│   └── SwaggerConfig.java        # Swagger API documentation config
└── LibraryManagementApplication.java # Main application class
```

#### Controller Layer
The controller layer handles HTTP requests and responses:
- **BookController**: Manages CRUD operations for books
- **UserController**: Manages CRUD operations for users
- **BorrowController**: Handles book borrowing and return operations
- **HomeController**: Serves the welcome page with API information

#### Service Layer
The service layer contains business logic:
- **BookService**: Logic for book operations (adding, updating, deleting)
- **UserService**: Logic for user management
- **BorrowService**: Logic for borrowing and returning books

#### Repository Layer
JPA repositories for database operations:
- **BookRepository**: Data access for books
- **UserRepository**: Data access for users
- **BorrowRecordRepository**: Data access for borrow records

#### Model Layer
Entity classes that map to database tables:
- **Book**: Book entity with attributes like title, author, ISBN
- **User**: User entity with attributes like name, email, contact info
- **BorrowRecord**: Entity for tracking book borrowing events

### Frontend Structure

The React frontend is organized as follows:

```
library-ui/
├── public/              # Public assets and HTML template
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── books/       # Book-related components
│   │   │   ├── BookList.js     # List of all books
│   │   │   └── BookForm.js     # Form for adding/editing books
│   │   ├── users/       # User-related components
│   │   │   ├── UserList.js     # List of all users
│   │   │   └── UserForm.js     # Form for adding/editing users
│   │   ├── borrows/     # Borrow-related components
│   │   │   ├── BorrowList.js   # List of all borrows
│   │   │   └── BorrowForm.js   # Form for creating new borrows
│   │   ├── Home.js      # Homepage component
│   │   └── Navbar.js    # Navigation component
│   ├── services/        # API service layer
│   │   └── api.js       # Axios API configuration and endpoints
│   ├── styles/          # CSS styles
│   ├── App.js           # Main App component with routing
│   └── index.js         # Entry point
├── package.json         # NPM dependencies and scripts
└── node_modules/        # Node dependencies (not versioned)
```

#### Components
React components that render the UI:
- **books/**: Book management components
- **users/**: User management components
- **borrows/**: Borrowing management components
- **Home.js**: Dashboard component showing stats and recent activities
- **Navbar.js**: Navigation component

#### Services
- **api.js**: Configures Axios and provides methods for API calls

## Data Model

The system uses three primary entities:

### Book
- **id**: Unique identifier
- **title**: Book title
- **author**: Book author
- **isbn**: International Standard Book Number
- **publicationYear**: Year of publication 
- **publisher**: Publishing company (optional)
- **description**: Book description (optional)
- **available**: Whether the book is available for borrowing

### User
- **id**: Unique identifier
- **name**: User's full name
- **email**: User's email address
- **phone**: Contact number (optional)
- **address**: Physical address (optional)

### BorrowRecord
- **id**: Unique identifier
- **book**: Reference to the borrowed book
- **user**: Reference to the user who borrowed the book
- **borrowDate**: When the book was borrowed
- **returnDate**: When the book was returned (null if not returned)

## API Endpoints

### Book Endpoints
- `GET /api/books`: Retrieve all books
- `GET /api/books/{id}`: Get a specific book
- `POST /api/books`: Create a new book
- `PUT /api/books/{id}`: Update a book
- `DELETE /api/books/{id}`: Delete a book

### User Endpoints
- `GET /api/users`: Retrieve all users
- `GET /api/users/{id}`: Get a specific user
- `POST /api/users`: Create a new user
- `PUT /api/users/{id}`: Update a user
- `DELETE /api/users/{id}`: Delete a user

### Borrow Endpoints
- `GET /api/borrows`: Retrieve all borrow records
- `POST /api/borrow?userId={id}&bookId={id}`: Borrow a book
- `POST /api/return?borrowId={id}`: Return a book

## Business Logic

### Book Management
- Books can be added with details like title, author, ISBN
- Books can be updated or deleted if they're not currently borrowed
- Books have an availability status that changes when borrowed/returned

### User Management
- Users can be registered with their details
- Users can be updated or deleted if they don't have active borrows

### Borrowing System
- A user can borrow a book if it's available
- When a book is borrowed, its availability is set to false
- When a book is returned, its availability is set to true
- The system tracks borrowing dates and return dates

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

### Start the backend

```bash
./gradlew bootRun
```

The Spring Boot server will start on port 8081. The API will be available at http://localhost:8081/api

### Start the frontend

```bash
cd library-ui
npm install
npm start
```

The React application will start on port 3000. Access it at http://localhost:3000

## Database Access

You can access the H2 database console at http://localhost:8081/h2-console with these credentials:
- JDBC URL: `jdbc:h2:mem:librarydb`
- Username: `sa`
- Password: (leave empty)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 