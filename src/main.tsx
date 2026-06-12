import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SoundProvider } from './contexts/SoundContext.tsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </HelmetProvider>
  </StrictMode>,
);
