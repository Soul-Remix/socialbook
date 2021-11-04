import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { Redirect, Route } from 'react-router';
import MobileBottomNav from './components/MobileBottomNav/MobileBottomNav';
import MobileDrawer from './components/MobileDrawer/MobileDrawer';
import NavBar from './components/NavBar/NavBar';
import PcDrawer from './components/PcDrawer/PcDrawer';
import RightSidebar from './components/RightSidebar/RightSidebar';
import ChatPage from './pages/ChatPage/ChatPage';
import { LoginPage } from './pages/Login/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RequestsPage from './pages/RequestsPage/RequestsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { useTrackedStore } from './store/store';

function App() {
  const state = useTrackedStore();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.darkMode ? 'dark' : 'light',
        },
      }),
    [state.darkMode]
  );

  useEffect(() => {
    if (state.expiry === null) {
      return;
    }
    if (state.expiry < Date.now()) {
      state.logOut();
    }
    return;
  }, [state]);

  if (!state.user && !state.token) {
    return <LoginPage />;
  }
  if (state.user && state.token) {
    return (
      <ThemeProvider theme={theme}>
        <NavBar />
        <MobileDrawer />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <PcDrawer />
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <MainPage />
          </Route>
          <Route path="/profile/:id" exact>
            <ProfilePage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
          <Route path="/requests" exact>
            <RequestsPage />
          </Route>
          <Route path="/chat" exact>
            <ChatPage />
          </Route>
          <RightSidebar />
          <MobileBottomNav />
        </Box>
      </ThemeProvider>
    );
  } else {
    return null;
  }
}

export default App;
