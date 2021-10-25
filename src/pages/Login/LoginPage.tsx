import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LoginForm from '../../components/LoginForm/LoginForm';

export const LoginPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: { xs: 'space-between', md: 'space-around' },
        minHeight: { md: '80vh' },
      }}
    >
      <Box sx={{ fontWeight: 'bold', mb: 2, mt: 3, padding: 2, flexGrow: 1 }}>
        <Typography
          variant="h3"
          sx={{
            color: 'info.main',
            textAlign: { xs: 'center', md: 'left' },
            fontWeight: 'bold',
          }}
        >
          SocialBook
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.5rem',
            maxWidth: '30ch',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Connect with friends and the world around you on Socialbook
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  );
};
