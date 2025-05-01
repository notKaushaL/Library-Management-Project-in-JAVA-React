import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { getBooks, deleteBook } from '../../services/api';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setError(err.response.data.message || 'Cannot delete book that has been borrowed.');
        } else {
          setError('Failed to delete book. Please try again later.');
        }
        console.error('Error deleting book:', err);
      }
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <Container className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading books...</span>
      </div>
      <p className="mt-3">Loading books...</p>
    </Container>
  );

  return (
    <Container>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>Books Management</h2>
        <Link to="/books/new">
          <Button variant="success" className="custom-btn">
            <FaPlus className="me-1" /> Add New Book
          </Button>
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <span className="text-muted">Total Books: {books.length}</span>
            </Col>
          </Row>

          {filteredBooks.length === 0 ? (
            <Alert variant="info">No books found matching your search criteria.</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped hover className="custom-table mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <span className={`status-badge ${book.available ? 'status-available' : 'status-borrowed'}`}>
                          {book.available ? 'Available' : 'Borrowed'}
                        </span>
                      </td>
                      <td>
                        <Link to={`/books/edit/${book.id}`}>
                          <Button variant="primary" size="sm" className="me-2">
                            <FaEdit /> Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDelete(book.id)}
                          disabled={!book.available}
                        >
                          <FaTrash /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookList; 