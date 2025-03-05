// src/components/CookieConsent.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup immediately if no consent has been given yet
    if (!Cookies.get('cookie_consent')) {
      setIsVisible(true);
    }
  }, []); // Runs once on mount

  const handleAccept = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
    setIsVisible(false);
    onAccept(); // Trigger UUID generation/storage
  };

  const handleDecline = () => {
    setIsVisible(false); // Hide popup, no consent stored
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#fff',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <p>We use cookies to improve your experience. Do you accept?</p>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={handleAccept}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          style={{
            padding: '8px 16px',
            background: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;