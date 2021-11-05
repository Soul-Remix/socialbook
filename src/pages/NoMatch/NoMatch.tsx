import { Container, Typography } from '@mui/material';

const NoMatch = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Oops, Page not found
      </Typography>
    </Container>
  );
};

export default NoMatch;
