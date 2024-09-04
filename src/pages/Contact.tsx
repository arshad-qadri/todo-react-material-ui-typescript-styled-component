// pages/Contact.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContactContainer = styled(Container)({
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const ContactForm = styled('form')({
  width: '100%',
  maxWidth: '600px',
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
});

const ContactTextField = styled(TextField)({
  marginBottom: '15px',
});

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for contacting we will get in touch asap!`);
    setFormData({ name: '', email: '', message: '' })
  };

  return (
    <ContactContainer maxWidth="md">
      <Typography variant="h3" component="h1">
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or feedback about this Todo app, feel free to get in touch with us!
      </Typography>
      <ContactForm onSubmit={handleSubmit}>
        <ContactTextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />
        <ContactTextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
        />
        <ContactTextField
          label="Message"
          name="message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Send Message
        </Button>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
