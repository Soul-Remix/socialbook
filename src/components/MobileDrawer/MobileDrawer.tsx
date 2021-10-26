import { SwipeableDrawer } from '@mui/material';
import DrawerList from '../DrawerList/DrawerList';

interface Prop {
  toggleDrawer: any;
  showDrawer: boolean;
}

const MobileDrawer = ({ showDrawer, toggleDrawer }: Prop) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={showDrawer}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      <DrawerList toggleDrawer={toggleDrawer} />
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
