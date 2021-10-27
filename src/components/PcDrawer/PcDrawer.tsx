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
        width: '260px',
        [`& .MuiDrawer-paper`]: {
          width: '260px',
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
