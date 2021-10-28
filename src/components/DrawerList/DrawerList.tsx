import {
  Chat,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  ManageAccounts,
  PersonAdd,
  Settings,
} from '@mui/icons-material';
import {
  Avatar,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTrackedStore } from '../../store/store';

interface Prop {
  toggleDrawer: any;
}

const DrawerList = ({ toggleDrawer }: Prop) => {
  const state = useTrackedStore();
  const history = useHistory();

  const [openNestedList, setOpenNestedList] = useState(false);

  const handleClick = (target: string) => {
    toggleDrawer();
    history.push(`/${target}`);
    state.setNavValue(target);
  };

  const handleCollapse = () => {
    setOpenNestedList(!openNestedList);
  };
  return (
    <Box sx={{ width: 250, mt: '65px' }} role="presentation">
      <List>
        <ListItem
          button
          onClick={() => {
            toggleDrawer();
            history.push(`/profile/${state.user.id}`);
            state.setNavValue('profile');
          }}
        >
          <ListItemIcon>
            <Avatar
              alt={state.user.firstName}
              src={state.user.profilePicture}
            />
          </ListItemIcon>
          <ListItemText
            primary={`${state.user.firstName} ${state.user.lastName}`}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {drawerItems.map((item) => {
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                handleClick(item.target);
              }}
              sx={{ ':hover': { color: 'primary.main' } }}
            >
              <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={handleCollapse}
          sx={{ ':hover': { color: 'success.main' } }}
        >
          <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
          {openNestedList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNestedList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleClick('settings')}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={{ ':hover': { color: 'error.main' } }}
          onClick={state.logOut}
        >
          <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default DrawerList;

const drawerItems = [
  {
    text: 'Home',
    target: 'home',
    icon: <Home />,
  },
  {
    text: 'Chat',
    target: 'chat',
    icon: <Chat />,
  },
  {
    text: 'Add Friends',
    target: 'requests',
    icon: <PersonAdd />,
  },
];
