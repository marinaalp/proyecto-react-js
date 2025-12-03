import Tarjeta from './Tarjeta';
import { useProductosContext } from "../context/ProductosContext";
import { useBusqueda } from "../context/BusquedaContext";
import { useState, useEffect, useContext } from "react";
import { CarritoContext } from '../context/CarritoContext';


const Productos = () => {
    // Usamos los contextos 
    const { productos, cargando, error } = useProductosContext();
    const { busqueda } = useBusqueda();
    const { agregarAlCarrito } = useContext(CarritoContext);
    const [cantidad] = useState(1);
    const [agregarId, setAgregarId] = useState(null);

    //paginado
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);

    // Filtrado
    const productosFiltrados = productos.filter((producto) =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Resetear página si cambia la búsqueda
    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

     // Handlers de interaccion
  const handleAgregarAlCarrito = ( producto ) => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    setAgregarId(producto.id);
    setTimeout(() => setAgregarId(null), 2000); // Resetea el estado despues de 2 segundos
  };
    // Manejo de estados de carga y error
   if (cargando) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando producto...</p>
          </div>
        </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar el producto</h2>
            <p className="text-gray-600 mb-6">Se ha producido un error al cargar el producto, intenta nuevamente mas tarde</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-200"
            >
              Volver al Inicio
            </button>
        </div>
      </div>
    );
  }

    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
    // Función para cambiar de página
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
    return (

        <div className="container my-4"> {/* Contenedor principal con margen vertical */}
            <h2 className="mb-4 text-center">Catálogo de Productos</h2>

            {/* Usamos la Grilla de Bootstrap:
        - row: Define una fila.
        - g-4: Define un "gutter" (espaciado) de 4 entre las columnas.
      */}

            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                    {productosPaginados.map((producto) => (
                        < div key={producto.id} className="col" >
                            <Tarjeta
                                producto={producto}
                                agregado={agregarId === producto.id}
                                onAgregar={() => handleAgregarAlCarrito(producto)}                            
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="d-flex justify-content-center w-100 mt-5">
                    <p class="alert alert-secondary">No hay productos que coincidan con la búsqueda.</p>
                </div>
            )}
            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>



        </div>

    );
};
export default Productos;
