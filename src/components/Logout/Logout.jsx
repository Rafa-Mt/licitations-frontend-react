import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { removeAuthToken } from '../../services/cookies';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate({ to: '/login' });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;