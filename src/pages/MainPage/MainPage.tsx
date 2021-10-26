import { Box } from '@mui/system';
import { useState } from 'react';
import Feed from '../../components/Feed/Feed';
import LoginNavbar from '../../components/LoginNavbar/LoginNavbar';
import MobileBottomNav from '../../components/MobileBottomNav/MobileBottomNav';
import MobileDrawer from '../../components/MobileDrawer/MobileDrawer';
import NavBar from '../../components/NavBar/NavBar';
import PcDrawer from '../../components/PcDrawer/PcDrawer';

const MainPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((old) => !old);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <MobileDrawer toggleDrawer={toggleDrawer} showDrawer={showDrawer} />
        <PcDrawer />
        <Feed />
        <MobileBottomNav toggleDrawer={toggleDrawer} />
      </Box>
    </>
  );
};

export default MainPage;
