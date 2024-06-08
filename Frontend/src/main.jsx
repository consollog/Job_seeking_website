import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEemail] = useState('');
  const [jobb, setJobb] = useState('');
  const [jobseeker, setJobseeker] = useState([])
  const [employer, setEmployer] = useState([])
  


  return (
    <Context.Provider value={{
      isAuthorized, setIsAuthorized, user, setUser, email, setEemail, jobb, setJobb,
      jobseeker, setJobseeker, employer, setEmployer
    }}>
      <App />
    </Context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
