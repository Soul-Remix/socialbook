import { LoginPage } from './pages/Login/LoginPage';
import { useStore } from './store/store';

function App() {
  const user = useStore((state) => state.user);

  if (!user) {
    return <LoginPage />;
  } else {
    return <div>{user.id}</div>;
  }
}

export default App;
