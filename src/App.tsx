import { useEffect } from 'react';
import { LoginPage } from './pages/Login/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import { useStore } from './store/store';

function App() {
  const user = useStore((state) => state.user);
  const expiry = useStore((state) => state.expiry);
  const logOut = useStore((state) => state.logOut);

  useEffect(() => {
    if (expiry === null) {
      return;
    }
    if (expiry < Date.now()) {
      logOut();
    }
    return;
  }, [expiry, logOut]);

  if (!user) {
    return <LoginPage />;
  } else {
    return <MainPage />;
  }
}

export default App;
