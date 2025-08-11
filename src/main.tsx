import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClassProvider } from './context/ClassContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClassProvider>
      <App />
    </ClassProvider>
  </StrictMode>
);
