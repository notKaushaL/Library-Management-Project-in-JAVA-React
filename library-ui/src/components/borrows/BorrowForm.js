import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getBooks, getUsers, borrowBook } from '../../services/api';

const BorrowForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userId: '',
    bookId: ''
  });
  
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksResponse, usersResponse] = await Promise.all([
          getBooks(),
          getUsers()
        ]);
        
        setBooks(booksResponse.data.filter(book => book.available));
        setUsers(usersResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await borrowBook(formData.userId, formData.bookId);
      navigate('/borrows');
    } catch (err) {
      setError('Failed to borrow book. Please try again.');
      console.error('Error borrowing book:', err);
    }
  };

  if (loading) return <Container><p>Loading data...</p></Container>;

  return (
    <Container>
      <h2>Borrow a Book</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {books.length === 0 && <Alert variant="warning">No books available for borrowing.</Alert>}
      {users.length === 0 && <Alert variant="warning">No users registered in system.</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
          <Form.Select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Book</Form.Label>
          <Form.Select
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            required
            disabled={books.length === 0}
          >
            <option value="">Select a book</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>{book.title} by {book.author}</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit" 
          className="me-2"
          disabled={books.length === 0 || users.length === 0}
        >
          Borrow Book
        </Button>
        
        <Button variant="secondary" onClick={() => navigate('/borrows')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default BorrowForm; 