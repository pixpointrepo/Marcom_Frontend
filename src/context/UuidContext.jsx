// src/context/UuidContext.js
import React, { createContext, useContext } from 'react';
import useUserUuid from '../components/hooks/useUserUuid';



const UuidContext = createContext();

export const UuidProvider = ({ children }) => {
  const [userUuid, handleAccept] = useUserUuid();

  return (
    <UuidContext.Provider value={{ userUuid, handleAccept }}>
      {children}
    </UuidContext.Provider>
  );
};

export const useUuid = () => {
  const context = useContext(UuidContext);
  if (context === undefined) {
    throw new Error('useUuid must be used within a UuidProvider');
  }
  return context;
};

export default UuidContext;