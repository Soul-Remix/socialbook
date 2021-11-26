import { Box } from '@mui/system';
import { ReactChild } from 'react';

import useWindowSize from '../../hooks/windowSize';
import MobileBottomNav from '../MobileBottomNav/MobileBottomNav';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import NavBar from '../NavBar/NavBar';
import PcDrawer from '../PcDrawer/PcDrawer';
import RightSidebar from '../RightSidebar/RightSidebar';

const Layout = ({ children }: { children: ReactChild }) => {
  const size = useWindowSize();

  return (
    <>
      <NavBar />
      {size.width < 900 && <MobileDrawer />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {size.width >= 900 && <PcDrawer />}
        {children}
        {size.width >= 1200 && <RightSidebar />}
        {size.width < 900 && <MobileBottomNav />}
      </Box>
    </>
  );
};

export default Layout;
