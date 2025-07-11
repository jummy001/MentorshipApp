import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'mentee',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.includes('@')) newErrors.email = 'Email is invalid';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!['mentor', 'mentee'].includes(form.role)) newErrors.role = 'Choose a valid role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});


      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Registration successful! You can now log in.');
        setForm({ fullName: '', email: '', password: '', role: 'mentee' });
        setErrors({});
      } else {
        setStatus(data.message || '❌ Registration failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center mb-2">Register</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

        <select
          name="role"
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        {status && <p className="text-center mt-2 text-green-700">{status}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
