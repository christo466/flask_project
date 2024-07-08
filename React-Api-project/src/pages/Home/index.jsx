import './Home.css';
import Header from '../../components/Header';
import Footer from '../../components';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export default function Profile() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToShope = () => {
    navigate('/shope');
  };

  const goToForm = () => {
    navigate('/Form');
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={goToDashboard}
            sx={{ mb: 2, width: '300px' }} 
          >
            Go to People Info
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={goToShope}
            sx={{ mb: 2, width: '300px' }} 
          >
            Go to Shope
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={goToForm}
            sx={{ mb: 2, width: '300px' }} 
          >
            Form
          </Button>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
