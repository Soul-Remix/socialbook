import { Drawer } from '@mui/material';
import { Box } from '@mui/system';
import SidebarFriends from './SidebarFriends/SidebarFriends';
import SidebarOnlineFriends from './SidebarOnlineFriends/SidebarOnlineFriends';

const RightSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: '270px',
        [`& .MuiDrawer-paper`]: {
          width: '280px',
          flexShrink: 0,
          boxSizing: 'border-box',
        },
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Box sx={{ width: 270, mt: '65px' }} role="presentation">
        <SidebarOnlineFriends />
        <SidebarFriends />
      </Box>
    </Drawer>
  );
};

export default RightSidebar;
