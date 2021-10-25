import { Button, Divider, Link, TextField } from '@mui/material';
import { Box } from '@mui/system';

const LoginForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 1, width: '100%' },
        padding: 2,
        backgroundColor: 'white',
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <TextField label="Email" required fullWidth />
      <TextField label="Password" type="password" required fullWidth />
      <Button variant="contained" sx={{ padding: 1, mt: 1, width: '100%' }}>
        Log In
      </Button>
      <Link
        href="#"
        sx={{
          display: 'block',
          margin: 'auto',
          mt: 2,
          textDecoration: 'none',
        }}
      >
        Forgot Password?
      </Link>
      <Divider sx={{ mt: 2, mb: 2, width: '100%' }}></Divider>
      <Button
        variant="contained"
        sx={{
          padding: 2,
          backgroundColor: 'success.light',
          width: '100%',
          ':hover': { backgroundColor: 'success.main' },
        }}
      >
        Create New Account
      </Button>
    </Box>
  );
};

export default LoginForm;
