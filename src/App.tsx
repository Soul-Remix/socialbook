import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ChatPage from './pages/ChatPage/ChatPage';
import { LoginPage } from './pages/Login/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RequestsPage from './pages/RequestsPage/RequestsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { useTrackedStore } from './store/store';
import PostPage from './pages/PostPage/PostPage';
import NoMatch from './pages/NoMatch/NoMatch';
import SearchPage from './pages/SearchPage/SearchPage';
import WebsocketProvider from './hooks/socket';
import Layout from './components/Layout/Layout';

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
      <WebsocketProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Switch>
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
              <Route path="/post/:id" exact>
                <PostPage />
              </Route>
              <Route path="/search" exact>
                <SearchPage />
              </Route>
              <Route>
                <NoMatch />
              </Route>
            </Switch>
          </Layout>
        </ThemeProvider>
      </WebsocketProvider>
    );
  } else {
    return null;
  }
}

export default App;
