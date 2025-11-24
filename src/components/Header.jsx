import NavBar from './NavBar';
import { Link } from 'react-router-dom';
// Importamos iconos de React Icons (Font Awesome)
import { FaUser, FaUserAstronaut } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";
import { useBusqueda } from "../context/BusquedaContext.jsx";


// Definimos los componentes de Icono
const UserIcon = () => <FaUserAstronaut size={24} />;
const CartIcon = () => <BsCart4 size={24} />;


const Header = ({ contadorEnCarrito = 0 }) => {
  const { busqueda, setBusqueda } = useBusqueda();
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
        <div className="me-4">
          <Link to="/login" className="text-white">
          <UserIcon />
          </Link>
        </div>
        {/* Icono de Carrito con Contador */}
        <div className="position-relative">
          <a href="#seccion-carrito" className="text-white">
            <CartIcon />
           
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
