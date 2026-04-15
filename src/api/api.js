import axios from 'axios';

const API = axios.create({
  // Ensure your .env variable doesn't have a trailing slash
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050"
});

// Automatically add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- AUTH ROUTES ---
// Backend prefix: /api/auth
export const loginUser = (data) => API.post('/api/auth/login', data);
export const registerUser = (data) => API.post('/api/auth/register', data);

// --- TRANSACTION ROUTES ---
// Backend prefix: /api/v1
export const getTransactions = () => API.get('/api/v1/get-transactions');
export const addTransaction = (data) => API.post('/api/v1/add-transaction', data);

// --- BUDGET ROUTES ---
// Backend prefix: /api/v1/budgets
export const getBudgets = () => API.get('/api/v1/budgets/get-budgets');

export default API;