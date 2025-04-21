import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import logo from '../logo.png'; // Replace with your image path

const IntroScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1000); // Fade out after 2s
    const timer2 = setTimeout(() => onFinish(), 2000); // Remove splash after 3s
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#000',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <img src={logo}  className="App-logo" alt="Intro" style={{ maxWidth: '50%', height: 'auto' }} />
    </Box>
  );
};

export default IntroScreen;
