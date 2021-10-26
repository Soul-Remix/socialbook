import { useEffect } from 'react';
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

  if (!state.user) {
    return <LoginPage />;
  } else {
    return <MainPage />;
  }
}

export default App;
