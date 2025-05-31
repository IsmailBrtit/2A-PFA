import React, { useState, useEffect } from 'react';
import AppRoutes from './routes';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return <AppRoutes user={user} />;
}

export default App;
