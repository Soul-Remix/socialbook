import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

interface Prop {
  showRegister: any;
  showLogin: any;
}

const LoginNavbar = ({ showRegister, showLogin }: Prop) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SocialBook
          </Typography>
          <Button
            color="inherit"
            sx={{ marginRight: 2 }}
            onClick={showRegister}
          >
            Register
          </Button>
          <Button color="inherit" onClick={showLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoginNavbar;
