import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToaProvider } from './context/ToaContext.jsx';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToaProvider>
      <App />
    </ToaProvider>
  </StrictMode>
);
