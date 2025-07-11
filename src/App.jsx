import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Dashboard from './pages/Dashboard';
import RequestForm from './pages/RequestForm';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Redirect base path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Main routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 404 fallback route */}
        <Route path="*" element={<h1 className="text-center text-2xl mt-10 text-red-600">404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
