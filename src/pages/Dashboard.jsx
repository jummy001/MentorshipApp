import React, { useEffect, useState } from 'react';
import AvatarUploader from '../components/AvatarUploader';
import { jwtDecode } from 'jwt-decode';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');

  const fetchBookings = async (token, userId, role) => {
    const url =
      role === 'mentor'
        ? `http://localhost:5000/bookings?mentorId=${userId}`
        : `http://localhost:5000/bookings?menteeId=${userId}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded = jwtDecode(token);
    setUser(decoded);
    fetchBookings(token, decoded.id, decoded.role);
  }, []);

  const updateBookingStatus = async (bookingId, status) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}/status`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ status }),
});


    const data = await res.json();
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );
    } else {
      alert(data.message || 'Failed to update');
    }
  };

  const chartData = [
    { name: 'Approved', value: bookings.filter(b => b.status === 'approved').length },
    { name: 'Rejected', value: bookings.filter(b => b.status === 'rejected').length },
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {user && (
          <div className="mb-4">
            <p className="text-lg text-gray-800">
              👋 Welcome back, <span className="text-blue-600 capitalize">{user.role}</span>!
            </p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-4 border-b">
          <button
            className={`pb-2 ${activeTab === 'bookings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={`pb-2 ${activeTab === 'stats' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button
            className={`pb-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        {/* Top Buttons */}
        <div className="flex space-x-4 mb-6">
          {user?.role === 'mentee' && (
            <a href="/request" className="text-blue-600 underline">Send New Request</a>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="text-red-600 underline"
          >
            Logout
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b) => (
                <li key={b._id} className="border p-4 rounded bg-white shadow">
                  <p><strong>Status:</strong> {b.status}</p>
                  <p><strong>Message:</strong> {b.message}</p>

                  {/* Mentor Avatar */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        b.mentor?.avatar
                          ? `http://localhost:5000/uploads/${b.mentor.avatar}`
                          : `https://ui-avatars.com/api/?name=${b.mentor?.fullName}&background=0D8ABC&color=fff`
                      }
                      alt="Mentor Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p><strong>Mentor:</strong> {b.mentor?.fullName}</p>
                  </div>

                  {/* Mentee Avatar */}
                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={
                        b.mentee?.avatar
                          ? `http://localhost:5000/uploads/${b.mentee.avatar}`
                          : `https://ui-avatars.com/api/?name=${b.mentee?.fullName}&background=777&color=fff`
                      }
                      alt="Mentee Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p><strong>Mentee:</strong> {b.mentee?.fullName}</p>
                  </div>

                  {user?.role === 'mentor' && b.status === 'pending' && (
                    <div className="mt-3 space-x-2">
                      <button
                        onClick={() => updateBookingStatus(b._id, 'approved')}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateBookingStatus(b._id, 'rejected')}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Booking Overview</h3>
            <BarChart width={300} height={200} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        )}

        {/* Profile Picture Upload Tab */}
        {activeTab === 'profile' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Upload Profile Picture</h3>
            {user && <AvatarUploader userId={user.id} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
