import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { useTrackedStore } from '../store/store';

export const WebsocketContext = createContext<Socket | null>(null);

const WebsocketProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [connection, setConnection] = useState<Socket | null>(null);
  const state = useTrackedStore();

  const options: any = useMemo(
    () => ({
      extraHeaders: {
        user: state.user?.id,
      },
    }),
    []
  );

  useEffect(() => {
    try {
      const socketConnection = io(
        'https://social-book-api.herokuapp.com',
        options
      );
      setConnection(socketConnection);
    } catch (err) {
      console.log(err);
    }
  }, [options]);

  return (
    <WebsocketContext.Provider value={connection}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocket = (): Socket | null => {
  const ctx = useContext(WebsocketContext);
  if (ctx === undefined) {
    throw new Error('useWebsocket can only be used inside WebsocketContext');
  }
  return ctx;
};

export default WebsocketProvider;
