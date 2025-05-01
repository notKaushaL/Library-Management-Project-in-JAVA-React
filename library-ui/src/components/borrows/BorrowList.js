import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getBorrows, returnBook } from '../../services/api';
import { Link } from 'react-router-dom';

const BorrowList = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBorrows = async () => {
    try {
      setLoading(true);
      const response = await getBorrows();
      setBorrows(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch borrow records. Please try again later.');
      console.error('Error fetching borrows:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleReturn = async (id) => {
    try {
      await returnBook(id);
      fetchBorrows(); // Refresh the list after return
    } catch (err) {
      setError('Failed to return book. Please try again later.');
      console.error('Error returning book:', err);
    }
  };

  if (loading) return <Container><p>Loading borrow records...</p></Container>;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Borrow Records</h2>
        </Col>
        <Col className="text-end">
          <Link to="/borrows/new">
            <Button variant="success">New Borrow</Button>
          </Link>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {borrows.length === 0 ? (
        <Alert variant="info">No borrow records found.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map(borrow => (
              <tr key={borrow.id}>
                <td>{borrow.id}</td>
                <td>{borrow.user?.name}</td>
                <td>{borrow.book?.title}</td>
                <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                <td>
                  {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : '-'}
                </td>
                <td>
                  <span className={`badge ${borrow.returnDate ? 'bg-success' : 'bg-warning'}`}>
                    {borrow.returnDate ? 'Returned' : 'Borrowed'}
                  </span>
                </td>
                <td>
                  {!borrow.returnDate && (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleReturn(borrow.id)}
                    >
                      Return Book
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BorrowList; 