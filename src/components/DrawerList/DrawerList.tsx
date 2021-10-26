import {
  Chat,
  ExpandLess,
  ExpandMore,
  Home,
  Logout,
  ManageAccounts,
  People,
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
import { useStore } from '../../store/store';

interface Prop {
  toggleDrawer: any;
}

const DrawerList = ({ toggleDrawer }: Prop) => {
  const setValue = useStore((state) => state.setNavValue);
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClick = (target: string) => {
    toggleDrawer();
    history.push(`/${target}`);
    setValue(target);
  };

  const handleCollapse = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem
          button
          onClick={() => {
            handleClick('profile');
          }}
        >
          <ListItemIcon>
            <Avatar
              alt="Remy Sharp"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.PApKAQbe2m90haOqcwFAJgHaE8%26pid%3DApi&f=1"
            />
          </ListItemIcon>
          <ListItemText primary="Person" />
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
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton sx={{ ':hover': { color: 'error.main' } }}>
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
