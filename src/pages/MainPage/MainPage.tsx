import { Box } from '@mui/system';
import Feed from '../../components/Feed/Feed';
import MobileBottomNav from '../../components/MobileBottomNav/MobileBottomNav';
import PcDrawer from '../../components/PcDrawer/PcDrawer';

const MainPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PcDrawer />
        <Feed />
        <MobileBottomNav />
      </Box>
    </>
  );
};

export default MainPage;
