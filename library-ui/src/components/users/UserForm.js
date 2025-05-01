import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../services/api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await getUser(id);
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user details. Please try again.');
          console.error('Error fetching user:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUser();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }
      navigate('/users');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} user. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} user:`, err);
    }
  };

  if (loading) return <Container><p>Loading user details...</p></Container>;

  return (
    <Container>
      <h2>{isEditMode ? 'Edit User' : 'Add New User'}</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="me-2">
          {isEditMode ? 'Update' : 'Create'} User
        </Button>
        
        <Button variant="secondary" onClick={() => navigate('/users')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm; 