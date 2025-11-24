import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
// Importamos iconos de React Icons (Font Awesome)
import { FaUserAstronaut } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
import { useBusqueda } from "../context/BusquedaContext.jsx";
import { useAuthContext } from '../context/AuthContext.jsx';
import { MdOutlineSettingsSuggest } from "react-icons/md";



// Definimos los componentes de Icono
const UserIcon = () => <FaUserAstronaut size={24} />;
const CartIcon = () => <BsCart4 size={24} />;
const SettingsIcon = () => <MdOutlineSettingsSuggest size={24} />;


const Header = ({ contadorEnCarrito = 0 }) => {
  const { busqueda, setBusqueda } = useBusqueda();
  const { estaLogueado, logout, usuario } = useAuthContext();
  const navigate = useNavigate();
  const esAdmin = usuario === 'admin';
  const manejarLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
      {/* Seccion Izquierda: Logo */}
      <div className="fs-4 fw-bold me-3">
        <Link to="/" className="text-white text-decoration-none">
          Mi Tiendita
        </Link>
      </div>
      {/* Seccion Central: Componente NavBar */}
      <div className="d-none d-lg-block">
        <NavBar />
      </div>
      {/* 🔍 BUSCADOR EN HEADER */}
      <div className="d-none d-lg-block ms-3">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="form-control"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "250px" }}
        />
      </div>
      {/* Seccion Derecha: Iconos */}
      <div className="d-flex align-items-center">
        {/* Icono de Usuario */}
        <div className="me-4 d-flex align-items-center">
          {estaLogueado ? (
            <>
            <button
              onClick={manejarLogout}
              className="btn btn-link text-white text-decoration-none p-0 d-flex align-items-center">
              <UserIcon />
              <span className="ms-2">Cerrar Sesión</span>
            </button>
            {esAdmin ? (
              <Link to="/admin" className="text-white text-decoration-none">
                <SettingsIcon />
              </Link>
            ) : (
              <Link to="/carrito" className="text-white text-decoration-none position-relative">
                <CartIcon />
                {contadorEnCarrito > 0 && (
                  <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {contadorEnCarrito}
                  </span>
                )}
              </Link>
            )}
            </>
          ) : (
          <Link to="/login" className="text-white text-decoration-none d-flex align-items-center">
          <span className="ms-2">Iniciar Sesión</span>
          <UserIcon />
          
          </Link>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;
