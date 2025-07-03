// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './context/AuthContext';
import { SiteSettingProvider } from './context/siteSetting/SiteSettingContext';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <SiteSettingProvider>
            <App />
          </SiteSettingProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  // </StrictMode>
);

