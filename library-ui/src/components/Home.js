import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaExchangeAlt, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <Container>
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold">Library Management System</h1>
          <p className="lead">A comprehensive solution for managing your library resources</p>
          <div className="d-flex justify-content-center">
            <div style={{ height: '4px', width: '100px', background: 'var(--primary-color)', marginTop: '10px', marginBottom: '30px' }}></div>
          </div>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 dashboard-card text-center">
            <div className="pt-4 pb-2" style={{ background: 'var(--primary-color)', color: 'white' }}>
              <FaBook size={48} />
            </div>
            <Card.Body>
              <Card.Title>Books Management</Card.Title>
              <Card.Text>
                Manage your library's book collection. Add new books, update information, or remove old books.
              </Card.Text>
              <Button as={Link} to="/books" variant="primary" className="custom-btn">
                Manage Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 dashboard-card text-center">
            <div className="pt-4 pb-2" style={{ background: 'var(--primary-color)', color: 'white' }}>
              <FaUsers size={48} />
            </div>
            <Card.Body>
              <Card.Title>Users Management</Card.Title>
              <Card.Text>
                Manage library users and memberships. Register new users or update existing user information.
              </Card.Text>
              <Button as={Link} to="/users" variant="primary" className="custom-btn">
                Manage Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 dashboard-card text-center">
            <div className="pt-4 pb-2" style={{ background: 'var(--primary-color)', color: 'white' }}>
              <FaExchangeAlt size={48} />
            </div>
            <Card.Body>
              <Card.Title>Borrow Records</Card.Title>
              <Card.Text>
                Track all book borrowings and returns. Manage overdue books and user borrowing history.
              </Card.Text>
              <Button as={Link} to="/borrows" variant="primary" className="custom-btn">
                Manage Borrows
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 dashboard-card text-center">
            <div className="pt-4 pb-2" style={{ background: 'var(--primary-color)', color: 'white' }}>
              <FaChartLine size={48} />
            </div>
            <Card.Body>
              <Card.Title>Library Statistics</Card.Title>
              <Card.Text>
                View statistics about your library's usage, popular books, and active users.
              </Card.Text>
              <Button as={Link} to="/" variant="primary" className="custom-btn">
                View Stats
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col md={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-3">Quick Overview</h4>
              <p>
                The Library Management System provides a comprehensive solution for managing all aspects of a library.
                From cataloging books to managing user accounts and tracking borrow records, this system streamlines
                all library operations in one place.
              </p>
              <p className="mb-0">
                Use the navigation above or the cards to access different sections of the system.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 