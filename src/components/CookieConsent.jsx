import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) { // Show popup only if no consent (neither accepted nor declined)
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie_consent', 'accepted', { expires: 90 }); // 90-day expiry
    setIsVisible(false);
    onAccept(); // Save UUID to cookies
  };

  const handleDecline = () => {
    Cookies.set('cookie_consent', 'declined', { expires: 1 }); // 1-day expiry
    setIsVisible(false); // Hide popup, tracking still happens
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