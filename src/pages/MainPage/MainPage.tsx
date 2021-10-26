import { SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import DrawerList from '../../components/DrawerList/DrawerList';
import MobileBottomNav from '../../components/MobileBottomNav/MobileBottomNav';

const MainPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((old) => !old);
  };
  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={showDrawer}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
      <MobileBottomNav toggleDrawer={toggleDrawer} />
    </>
  );
};

export default MainPage;
