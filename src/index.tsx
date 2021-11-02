import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import WebsocketProvider from './hooks/socket';
import './index.css';

export const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <WebsocketProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Router>
    </WebsocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
