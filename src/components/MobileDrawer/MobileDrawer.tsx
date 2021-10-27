import { SwipeableDrawer } from '@mui/material';
import { useTrackedStore } from '../../store/store';
import DrawerList from '../DrawerList/DrawerList';

const MobileDrawer = () => {
  const state = useTrackedStore();
  return (
    <SwipeableDrawer
      anchor="right"
      open={state.showDrawer}
      onClose={state.toggleDrawer}
      onOpen={state.toggleDrawer}
    >
      <DrawerList toggleDrawer={state.toggleDrawer} />
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
