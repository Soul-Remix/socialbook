import { Container } from '@mui/material';
import Feed from '../../components/Feed/Feed';

const MainPage = () => {
  return (
    <Container sx={{ padding: 4, mr: { sm: 6, md: 8 }, ml: { sm: 6, md: 8 } }}>
      <Feed />
    </Container>
  );
};

export default MainPage;
