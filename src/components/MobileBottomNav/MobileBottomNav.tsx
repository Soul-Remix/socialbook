import { Chat, Home, Menu, People, Person } from '@mui/icons-material';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { useState } from 'react';

interface Prop {
  toggleDrawer: any;
}

const MobileBottomNav = ({ toggleDrawer }: Prop) => {
  const [value, setValue] = useState('home');
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { md: 'none' },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<Home />} />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
        />
        <BottomNavigationAction label="Chat" value="chat" icon={<Chat />} />
        <BottomNavigationAction
          label="Friends"
          value="friends"
          icon={
            <Badge badgeContent={2} color="primary" variant="dot">
              <People />
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Menu />}
          onClick={toggleDrawer}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
