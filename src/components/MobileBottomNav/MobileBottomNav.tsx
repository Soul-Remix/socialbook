import { Chat, Home, Menu, People, Person } from '@mui/icons-material';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import { useHistory } from 'react-router';
import { useTrackedStore } from '../../store/store';

const MobileBottomNav = () => {
  const state = useTrackedStore();
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
        value={state.navValue}
        onChange={(event, newValue) => {
          state.setNavValue(newValue);
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
            <Badge
              badgeContent={state.user?.friendReq}
              color="primary"
              variant="dot"
            >
              <People />
            </Badge>
          }
          onClick={() => history.push('/requests')}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Menu />}
          onClick={() => state.toggleDrawer()}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
