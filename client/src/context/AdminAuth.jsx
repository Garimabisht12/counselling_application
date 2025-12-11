import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
  const [admin, setAdmin] = useState(() =>
    JSON.parse(localStorage.getItem('adminInfo') || 'null')
  );

  const login = (tok, info) => {
    setToken(tok);
    setAdmin(info);
    localStorage.setItem('adminToken', tok);
    localStorage.setItem('adminInfo', JSON.stringify(info));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
  };

  return (
    <AdminAuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
