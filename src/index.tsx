import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 240000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
