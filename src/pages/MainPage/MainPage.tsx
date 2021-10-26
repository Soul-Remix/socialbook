import { Chat, Home, Menu, Person } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import MobileBottomNav from '../../components/MobileBottomNav/MobileBottomNav';

const MainPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((old) => !old);
  };
  return (
    <>
      <MobileBottomNav toggleDrawer={toggleDrawer} />
    </>
  );
};

export default MainPage;
