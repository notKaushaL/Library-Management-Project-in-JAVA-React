import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getBook, createBook, updateBook } from '../../services/api';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    available: true
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        try {
          const response = await getBook(id);
          setBook(response.data);
        } catch (err) {
          setError('Failed to fetch book details. Please try again.');
          console.error('Error fetching book:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchBook();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({
      ...book,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      if (isEditMode) {
        await updateBook(id, book);
        setSuccess('Book updated successfully!');
      } else {
        await createBook(book);
        setSuccess('Book created successfully!');
      }
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate('/books');
      }, 1500);
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} book. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} book:`, err);
    }
  };

  if (loading) return (
    <Container className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading book details...</span>
      </div>
      <p className="mt-3">Loading book details...</p>
    </Container>
  );

  return (
    <Container>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
        <Link to="/books">
          <Button variant="outline-secondary" className="custom-btn">
            <FaArrowLeft className="me-1" /> Back to Books
          </Button>
        </Link>
      </div>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="custom-form p-0">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter book title"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                    placeholder="Enter author name"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    required
                    placeholder="Enter ISBN number"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                {isEditMode && (
                  <Form.Group className="mb-3 mt-4">
                    <Form.Check
                      type="checkbox"
                      label="Available for borrowing"
                      name="available"
                      checked={book.available}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" as={Link} to="/books" className="me-2 custom-btn">
                Cancel
              </Button>
              
              <Button variant="primary" type="submit" className="custom-btn custom-btn-primary">
                <FaSave className="me-1" /> {isEditMode ? 'Update' : 'Create'} Book
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BookForm; 