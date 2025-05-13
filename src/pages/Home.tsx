import React, { useEffect, useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser') || '';
    setLoggedInUser(user);
  }, []);

  return (
    <div className="home-container">
      <h1>Home Dashboard</h1>
      <p>Welcome, {loggedInUser ? loggedInUser : 'Guest'}!</p>
    </div>
  );
};

export default Home;
