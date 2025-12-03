import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
// Importamos iconos de React Icons (Font Awesome)
import { FaUserAstronaut } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
import { useBusqueda } from "../context/BusquedaContext.jsx";
import { useAuthContext } from '../context/AuthContext.jsx';
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { CarritoContext } from '../context/CarritoContext';
import { useContext } from 'react';


// Definimos los componentes de Icono
const UserIcon = () => <FaUserAstronaut size={24} />;
const CartIcon = () => <BsCart4 size={24} />;
const SettingsIcon = () => <MdOutlineSettingsSuggest size={24} />;

const Header = () => {
  const { busqueda, setBusqueda } = useBusqueda();
  const { estaLogueado, logout, usuario } = useAuthContext();
  const navigate = useNavigate();
  const esAdmin = usuario === 'admin';
  const { carrito } = useContext(CarritoContext);
  const contadorEnCarrito = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
  const manejarLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000
        }}
      >
        {/* MENU HAMBURGUESA (MÓVIL) */}
        <button
          className="btn btn-outline-light d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuMovil"
        >
          ☰
        </button>
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
                <p className="me-3 mb-0">Hola, {usuario}</p>
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
      {/* OFFCANVAS (MENÚ MÓVIL) */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="menuMovil"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menú</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">

          {/* NAVBAR MOBILE */}
          <div className="navbar-mobile">
            <NavBar />
          </div>


          <hr className="border-secondary" />

          {/* BUSCADOR MOBILE */}
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* ICONOS MOBILE */}
          <div className="mt-3">
            {estaLogueado ? (
              <>
                <p>Hola, {usuario}</p>

                <button
                  onClick={manejarLogout}
                  className="btn btn-outline-light w-100 mb-3"
                >
                  <UserIcon /> Cerrar Sesión
                </button>

                {esAdmin ? (
                  <Link to="/admin" className="btn btn-outline-light w-100 mb-3">
                    <SettingsIcon /> Admin
                  </Link>
                ) : (
                  <Link to="/carrito" className="btn btn-outline-light w-100 mb-3">
                    <CartIcon /> Carrito ({contadorEnCarrito})
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-light w-100">
                <UserIcon /> Iniciar Sesión
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
