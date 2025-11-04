import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(''); // <-- 1. ADD NEW STATE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/me', {
          method: 'GET',
          credentials: 'include' 
        });

        if (!res.ok) {
          throw new Error('Not authorized. Please log in again.');
        }

        const data = await res.json();
        setUser(data); 
        setCsrfToken(data.csrfToken); // <-- 2. SAVE THE TOKEN FROM THE RESPONSE
        
      } catch (err) {
        console.error(err);
        setError(err.message);
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',
        // --- 3. ADD THE CSRF TOKEN AS A HEADER ---
        headers: {
          'CSRF-Token': csrfToken // Send the token in the 'CSRF-Token' header
        }
        // --- END NEW PART ---
      });

      if (res.ok) {
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to log out.');
    }
  };

  if (loading) {
    return <p>Loading your information...</p>;
  }

  if (error) {
    return null;
  }

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.name}!</h2>
        <p>You are logged in with the email: {user.email}</p>
        <p><strong>Your Role: {user.role}</strong></p>

        {/* --- THIS IS THE NEW PART --- */}
        {/* This is conditional rendering. The link will only
            appear if 'user.role' is equal to 'admin' */}
        {user.role === 'admin' && (
          <div style={{ marginTop: '20px', padding: '10px', border: '2px solid blue' }}>
            <h3>Admin Tools</h3>
            <Link to="/admin">Go to Admin Dashboard</Link>
          </div>
        )}
        {/* --- END NEW PART --- */}
        
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    );
  }

  return null;
};

export default ProfilePage;