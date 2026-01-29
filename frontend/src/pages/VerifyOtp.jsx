import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/api';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get email from navigation state
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email in state, redirect back to forgot password
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage({ type: 'error', text: 'Please enter OTP' });
      return;
    }
    if (otp.length !== 6) {
      setMessage({ type: 'error', text: 'OTP must be 6 digits' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const res = await verifyOtp(email, otp);
      setMessage({ type: 'success', text: res.data.message || 'OTP verified successfully' });
      setTimeout(() => {
        navigate('/reset-password', { state: { email, otp } });
      }, 1000);
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'Invalid or expired OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    navigate('/forgot-password');
  };

  return (
    <div style={{ maxWidth: 450, margin: '40px auto', padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Verify OTP</h2>

      <form onSubmit={handleVerifyOtp}>
        <div style={{
          marginBottom: 20,
          padding: '12px',
          backgroundColor: '#e8f4f8',
          borderRadius: '4px',
          borderLeft: '4px solid #0b6efd'
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            Email: <strong>{email}</strong>
          </p>
          <button
            type="button"
            onClick={handleChangeEmail}
            style={{
              background: 'none',
              border: 'none',
              color: '#0b6efd',
              cursor: 'pointer',
              fontSize: '12px',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            Change Email
          </button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Enter 6-Digit OTP</label>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
            Check your email for the OTP code
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(val);
            }}
            required
            maxLength="6"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: 6,
              boxSizing: 'border-box',
              border: '2px solid #ddd',
              borderRadius: '4px',
              fontSize: '24px',
              letterSpacing: '8px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
            placeholder="000000"
          />
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
            {otp.length}/6
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: (loading || otp.length !== 6) ? '#ccc' : '#0b6efd',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: (loading || otp.length !== 6) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      {/* Messages */}
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

export default VerifyOtp;
