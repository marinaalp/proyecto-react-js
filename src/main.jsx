import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import { BusquedaProvider } from './context/BusquedaContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <BusquedaProvider>
      <AuthProvider>
        <ProductosProvider>
          <App />
        </ProductosProvider> 
      </AuthProvider>   
      </BusquedaProvider>   
    </BrowserRouter>
  </StrictMode>,
)
