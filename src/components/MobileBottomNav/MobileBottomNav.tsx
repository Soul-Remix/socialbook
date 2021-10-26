import { Chat, Home, Menu, People, Person } from '@mui/icons-material';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { useHistory } from 'react-router';
import { useStore } from '../../store/store';

interface Prop {
  toggleDrawer: any;
}

const MobileBottomNav = ({ toggleDrawer }: Prop) => {
  const value = useStore((state) => state.navValue);
  const setValue = useStore((state) => state.setNavValue);
  const history = useHistory();
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
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Home />}
          onClick={() => history.push('/home')}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<Person />}
          onClick={() => history.push('/profile')}
        />
        <BottomNavigationAction
          label="Chat"
          value="chat"
          icon={<Chat />}
          onClick={() => history.push('/chat')}
        />
        <BottomNavigationAction
          label="Friends"
          value="requests"
          icon={
            <Badge badgeContent={2} color="primary" variant="dot">
              <People />
            </Badge>
          }
          onClick={() => history.push('/requests')}
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
