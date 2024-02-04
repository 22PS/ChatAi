import { Box, Button, Typography } from '@mui/material';
import CustomizedInput from '../components/shared/CustomizedInput';
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated, if yes, redirect to home
    if (auth?.isLoggedIn) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // console.log(email, password);
    try {
      toast.loading('signing in...', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Login successful!', { id: 'login' });
      navigate('/chat');
    } catch (error) {
      console.log(error);
      toast.error('Login failed!', { id: 'login' });
    }
  };
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display="flex"
      mt={4}
      flexDirection={{ md: 'row', sm: 'column' }}
    >
      <Box
        padding={2}
        margin={4}
        display={{ sm: 'flex', xs: 'none' }}
        flex={'1 1 50%'} // change
        justifyContent={'center'}
      >
        <img src="chatbot5.png" alt="login-logo" className="image-login" />
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        margin={2}
        flex={'1 1 50%'}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: '16px',
            padding: '36px',
            boxShadow: '10px 10px 20px #000',
            borderRadius: '10px',
            border: 'none',
            width: '70%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={500}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '100%',
                borderRadius: 2,
                bgcolor: '#00d0db',
                color: '#292f38',
                fontSize: 18,
                fontWeight: '600',
                ':hover': {
                  color: '#292f38',
                  bgcolor: 'white',
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
