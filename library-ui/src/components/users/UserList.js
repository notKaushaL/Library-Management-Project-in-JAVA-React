import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getUsers, deleteUser } from '../../services/api';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setError(err.response.data.message || 'Cannot delete user who has borrowed books.');
        } else {
          setError('Failed to delete user. Please try again later.');
        }
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) return <Container><p>Loading users...</p></Container>;

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Users</h2>
        </Col>
        <Col className="text-end">
          <Link to="/users/new">
            <Button variant="success">Add New User</Button>
          </Link>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {users.length === 0 ? (
        <Alert variant="info">No users found. Add a new user to get started.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/edit/${user.id}`}>
                    <Button variant="primary" size="sm" className="me-2">Edit</Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserList; 