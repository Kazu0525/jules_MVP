import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Get root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Debug information
console.log('🚀 Weave Japan MVP Frontend Started');
console.log('🔧 API URL:', process.env.REACT_APP_API_URL);
console.log('🌍 Environment:', process.env.NODE_ENV);