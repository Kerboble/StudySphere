import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    if(currentUser !== null){
        setIsLoggedIn(true);
    }
  }, [currentUser]);
  
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
