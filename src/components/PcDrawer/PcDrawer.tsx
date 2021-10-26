import { Drawer } from '@mui/material';

import DrawerList from '../DrawerList/DrawerList';

const PcDrawer = () => {
  const toggleDrawer = () => {
    return;
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: '250px',
        [`& .MuiDrawer-paper`]: {
          width: '250px',
          flexShrink: 0,
          boxSizing: 'border-box',
        },
        display: { xs: 'none', md: 'block' },
      }}
    >
      <DrawerList toggleDrawer={toggleDrawer} />
    </Drawer>
  );
};

export default PcDrawer;
