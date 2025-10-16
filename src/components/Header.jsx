import NavBar from './NavBar';
import { Link } from 'react-router-dom';
// Importamos iconos de React Icons (Font Awesome)
import { FaUser, FaUserAstronaut } from 'react-icons/fa';
import { BsCart4 } from "react-icons/bs";


// Definimos los componentes de Icono
const UserIcon = () => <FaUserAstronaut size={24} />;
const CartIcon = () => <BsCart4 size={24} />;


const Header = ({ contadorEnCarrito = 0 }) => {
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
      {/* Seccion Derecha: Iconos */}
      <div className="d-flex align-items-center">
        {/* Icono de Usuario */}
        <div className="me-4">
          <UserIcon />
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
