import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter email' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await forgotPassword(email);
      setMessage({ type: 'success', text: res.data.message || 'OTP sent to your email' });
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1000);
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'Error sending OTP' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: '40px auto', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Forgot Password</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Enter your email address and we'll send you an OTP to reset your password
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter your email address"
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
          {loading ? 'Sending OTP...' : 'Send OTP'}
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

export default ForgotPassword;
