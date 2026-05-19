import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PrototypeGate from './PrototypeGate.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrototypeGate>
      <App />
    </PrototypeGate>
  </StrictMode>,
);
