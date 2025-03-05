import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { generateUUID } from '../../utils/uuid';

const useUserUuid = () => {
  const [uuid, setUuid] = useState(null);

  // Generate or retrieve UUID on mount
  useEffect(() => {
    let userUuid = Cookies.get('user_uuid');
    if (!userUuid || Cookies.get('cookie_consent') !== 'accepted') {
      // Generate a new UUID for new users or if consent isn’t given
      userUuid = generateUUID();
    }
    setUuid(userUuid); // Set UUID regardless of consent
  }, []);

  // Handle consent acceptance
  const handleAccept = () => {
    let userUuid = uuid; // Use the existing in-memory UUID
    Cookies.set('user_uuid', userUuid, { expires: 365 }); // Save to cookies
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
  };

  return [uuid, handleAccept];
};

export default useUserUuid;