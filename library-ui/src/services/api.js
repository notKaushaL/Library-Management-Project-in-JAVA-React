import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Book API calls
export const getBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const createBook = (book) => api.post('/books', book);
export const updateBook = (id, book) => api.put(`/books/${id}`, book);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// User API calls
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Borrow API calls
export const getBorrows = () => api.get('/borrows');
export const borrowBook = (userId, bookId) => api.post(`/borrow?userId=${userId}&bookId=${bookId}`);
export const returnBook = (borrowId) => api.post(`/return?borrowId=${borrowId}`);

export default api; 