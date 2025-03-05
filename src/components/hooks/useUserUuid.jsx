// src/hooks/useUserUuid.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { generateUUID } from '../../utils/uuid';

const useUserUuid = () => {
  const [uuid, setUuid] = useState(null);

  const handleAccept = () => {
    let userUuid = Cookies.get('user_uuid');
    if (!userUuid) {
      userUuid = generateUUID();
      Cookies.set('user_uuid', userUuid, { expires: 365 });
    }
    Cookies.set('cookie_consent', 'accepted', { expires: 365 });
    setUuid(userUuid);
  };

  useEffect(() => {
    if (Cookies.get('cookie_consent') === 'accepted') {
      let userUuid = Cookies.get('user_uuid');
      if (!userUuid) {
        userUuid = generateUUID();
        Cookies.set('user_uuid', userUuid, { expires: 365 });
      }
      setUuid(userUuid);
    }
  }, []);

  return [uuid, handleAccept];
};

export default useUserUuid;