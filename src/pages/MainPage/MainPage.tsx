import { Box } from '@mui/system';
import Feed from '../../components/Feed/Feed';
import MobileBottomNav from '../../components/MobileBottomNav/MobileBottomNav';
import PcDrawer from '../../components/PcDrawer/PcDrawer';
import RightSidebar from '../../components/RightSidebar/RightSidebar';

const MainPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PcDrawer />
        <Feed />
        <RightSidebar />
        <MobileBottomNav />
      </Box>
    </>
  );
};

export default MainPage;
