import { useState } from 'react';
import { Button } from '@mui/material';
import { logout } from '../services/fetch';
import Redirecter from './Redirecter';

const Logout: React.FC = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogout = async () => {
    try {
        const response = await logout();
        console.log(response);
        if (response?.success) {
            console.log('Logout successful');
            setShouldRedirect(true);
        }
    } catch (error) {
        console.error('Error logging out', error);
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button>
      <Redirecter to="/login" shouldRedirect={shouldRedirect} />
    </>
  );
};

export default Logout;