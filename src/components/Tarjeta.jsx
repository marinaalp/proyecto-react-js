import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Tarjeta = ({ 
  producto, 
  onAgregar,
  agregado
 }) => {
  const { usuario, estaLogueado } = useAuthContext();
  const puedeComprar = estaLogueado && usuario !== "admin";

  return (
    // Usa la clase 'card' de Bootstrap
    <div className="card h-100">
      
      {/* Imagen */}
      <img 
        src={producto.image} 
        className="card-img-top p-3" // p-3 para un pequeño padding alrededor de la imagen
        alt={producto.title} 
        style={{ height: '200px', objectFit: 'contain' }} // Estilos inline para asegurar el tamaño
      />

      {/* Cuerpo de la Tarjeta */}
      <div className="card-body d-flex flex-column">
        
        {/* Título y Precio */}
        <h5 className="card-title text-truncate">{producto.title}</h5>
        <p className="card-text fw-bold mt-auto">${(producto.price).toFixed(2)}</p> 
        {/* mt-auto para empujar el precio al fondo, y fw-bold para destacarlo */}

        {/* Botones */}
        <div className="d-grid gap-2">
           {/* SOLO SE MUESTRA SI ESTA LOGUEADO Y NO ES ADMIN */}
          {puedeComprar && (
            <button 
                onClick={onAgregar}
                className={`btn ${agregado ? 'btn-info' : 'btn-dark'}`}
                 disabled={agregado}               
            >
                {agregado ? 'Agregado al Carrito' : 'Agregar al Carrito'}
            </button>
          )}
            <Link 
                to={`/productos/${producto.id}`} 
                className="btn btn-outline-primary"
            >
                Ver Detalles
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;