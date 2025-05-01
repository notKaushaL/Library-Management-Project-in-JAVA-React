import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import BorrowList from './components/borrows/BorrowList';
import BorrowForm from './components/borrows/BorrowForm';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/edit/:id" element={<BookForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/borrows" element={<BorrowList />} />
            <Route path="/borrows/new" element={<BorrowForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 