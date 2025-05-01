import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaBook, FaUser, FaExchangeAlt, FaHome } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <FaBook className="me-2" size={24} />
          <span>Library Management System</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center">
              <FaHome className="me-1" />
              <span>Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/books" className="d-flex align-items-center">
              <FaBook className="me-1" />
              <span>Books</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="d-flex align-items-center">
              <FaUser className="me-1" />
              <span>Users</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/borrows" className="d-flex align-items-center">
              <FaExchangeAlt className="me-1" />
              <span>Borrows</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 