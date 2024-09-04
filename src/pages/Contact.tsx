import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContactUsMutation } from '../redux/services/contact.api';

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
  const [contactUs, { isLoading, isError, isSuccess, error }] = useContactUsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contactResponse = await contactUs(formData).unwrap(); // Unwraps the mutation to get the result or throw error
      console.log('Response:', contactResponse);
      alert('Thanks for contacting us! We will get in touch ASAP.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting the form. Please try again later.');
    }
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
        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </ContactForm>
      {isError && <Typography color="error">Error: {(error as any)?.data?.message || 'Submission failed'}</Typography>}
      {isSuccess && <Typography color="success">Message sent successfully!</Typography>}
    </ContactContainer>
  );
};

export default Contact;
