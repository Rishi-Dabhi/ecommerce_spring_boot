import React, { useState } from 'react';

function ManagerLogin({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/manager/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('managerToken', data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Error logging in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-login-container">
      <div className="manager-login-box">
        <h2>Manager Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
        <p className="hint">Demo credentials: admin / password123</p>
      </div>
    </div>
  );
}

export default ManagerLogin;
