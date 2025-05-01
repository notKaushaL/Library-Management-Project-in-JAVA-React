# Library Management System

A complete Library Management System with a Spring Boot backend and React frontend.

## Features

- **Books Management**: Add, update, delete, and list books
- **User Management**: Register, update, and manage library users
- **Borrowing System**: Track book borrowing and returns
- **REST API**: Full RESTful API for all operations
- **H2 Database**: In-memory database for demo purposes
- **Swagger UI**: Interactive API documentation

## Technology Stack

### Backend
- Java 8
- Spring Boot 2.7.x
- Spring Data JPA
- H2 Database (in-memory)
- Swagger (Springfox)
- Gradle

### Frontend
- React 18
- React Router 6
- Axios
- Bootstrap 5
- Node.js/npm

## Prerequisites

- JDK 8 or higher
- Node.js 14+ and npm
- Gradle

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

## API Documentation

The API documentation is available via Swagger UI at http://localhost:8081/swagger-ui/

## Database Access

You can access the H2 database console at http://localhost:8081/h2-console with these credentials:
- JDBC URL: `jdbc:h2:mem:librarydb`
- Username: `sa`
- Password: (leave empty)

## Project Structure

### Backend

- `src/main/java/com/management/library/controller`: REST controllers
- `src/main/java/com/management/library/model`: Data models
- `src/main/java/com/management/library/repository`: JPA repositories
- `src/main/java/com/management/library/service`: Business logic

### Frontend

- `library-ui/src/components`: React components
- `library-ui/src/services`: API services
- `library-ui/src/styles`: CSS files

## Sample Data

The application is pre-loaded with sample data including books, users, and borrowing records.

## License

This project is licensed under the MIT License. 