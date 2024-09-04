// pages/About.tsx
import React from 'react';
import { Container, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

const AboutContainer = styled(Container)({
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const StyledAvatar = styled(Avatar)({
  backgroundColor: 'blue',
  marginBottom: '20px',
});

const AboutText = styled(Typography)({
  fontSize: '18px',
  lineHeight: '1.6',
  marginTop: '20px',
});

const About: React.FC = () => {
  return (
    <AboutContainer maxWidth="md">
      <StyledAvatar>
        <InfoIcon fontSize="large" />
      </StyledAvatar>
      <Typography variant="h3" component="h1">
        About This Todo App
      </Typography>
      <AboutText>
        This Todo app helps you stay organized and manage your tasks effectively. You can add, remove, and mark tasks as complete, keeping track of what’s important to you.
      </AboutText>
      <AboutText>
        Built using React, TypeScript, and Material UI, this app demonstrates modern frontend development practices and best user interface design.
      </AboutText>
    </AboutContainer>
  );
};

export default About;
