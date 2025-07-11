import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});


      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        const decoded = jwtDecode(data.token);
        setSuccess(true);

        // Delay for animation, then redirect based on role
        setTimeout(() => {
          if (decoded.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleLogin}
        className={`w-full max-w-md bg-white shadow-lg rounded-lg p-8 ${
          success ? 'animate-bounce' : 'animate-fade-in'
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
        >
          Log In
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account? <a href="/register" className="text-blue-600 underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
