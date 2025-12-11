import { createContext, useContext, useState } from 'react';

const StudentAuthContext = createContext();

export const StudentAuthProvider = ({ children }) => {
  const [token,   setToken]   = useState(() => localStorage.getItem('stuToken'));
  const [student, setStudent] = useState(() =>
    JSON.parse(localStorage.getItem('stuInfo') || 'null')
  );

  const login = (tok, info) => {
  setToken(tok);
  setStudent(info);          // store full object
  localStorage.setItem('stuToken', tok);
  localStorage.setItem('stuInfo', JSON.stringify(info));
};


  const logout = () => {
    setToken(null);
    setStudent(null);
    localStorage.removeItem('stuToken');
    localStorage.removeItem('stuInfo');
  };

  return (
    <StudentAuthContext.Provider value={{ token, student, login, logout }}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => useContext(StudentAuthContext);
