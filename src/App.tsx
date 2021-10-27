import { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import MobileDrawer from './components/MobileDrawer/MobileDrawer';
import NavBar from './components/NavBar/NavBar';
import { LoginPage } from './pages/Login/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { useTrackedStore } from './store/store';

function App() {
  const state = useTrackedStore();

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
      <>
        <NavBar />
        <MobileDrawer />
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <MainPage />
        </Route>
      </>
    );
  } else {
    return null;
  }
}

export default App;
