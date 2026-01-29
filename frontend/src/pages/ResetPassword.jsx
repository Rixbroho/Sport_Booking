import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get email and otp from navigation state
    if (location.state?.email && location.state?.otp) {
      setEmail(location.state.email);
      setOtp(location.state.otp);
    } else {
      // If no email/otp in state, redirect back
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      setMessage({ type: 'error', text: 'Please fill all password fields' });
      return;
    }
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await resetPassword(email, otp, password);
      setMessage({ type: 'success', text: res.data.message || 'Password reset successfully' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'Error resetting password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: '40px auto', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Reset Your Password</h2>

      <form onSubmit={handleSubmit}>
        <div style={{
          marginBottom: 20,
          padding: '12px',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          borderLeft: '4px solid #4caf50'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#2e7d32' }}>
            ✓ OTP Verified Successfully
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginTop: 6,
              boxSizing: 'border-box',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Enter new password (min 6 characters)"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginTop: 6,
              boxSizing: 'border-box',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#0b6efd',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: 20,
          padding: 12,
          borderRadius: '4px',
          color: message.type === 'error' ? '#d32f2f' : '#2e7d32',
          backgroundColor: message.type === 'error' ? '#ffebee' : '#e8f5e9',
          border: `1px solid ${message.type === 'error' ? '#ef5350' : '#66bb6a'}`
        }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
