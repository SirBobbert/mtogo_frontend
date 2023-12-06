import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null); // Initialize userId state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/customers/login', {
        email,
        password,
      });


      // Save userId to state
      setUserId(response.data.userId);

      // Handle successful login
      console.log('Login successful. User ID:', response.data.userId);

      localStorage.setItem('userId', response.data.customerId);

      // Redirect to a new page (replace '/dashboard' with your desired route)
      navigate('/dashboard');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
