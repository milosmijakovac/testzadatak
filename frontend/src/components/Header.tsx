import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; // Import global CSS

interface HeaderProps {
  firstName: string;
  lastName: string;
}

const Header: React.FC<HeaderProps> = ({ firstName, lastName }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/register');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header>
      <h1>Welcome {firstName} {lastName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
