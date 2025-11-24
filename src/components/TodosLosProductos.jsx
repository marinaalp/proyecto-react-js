import { useBusqueda } from "../context/BusquedaContext";
import { useProductosContext } from "../context/ProductosContext";
export default function TodosLosProductos() {
    const { productos, cargando, error } = useProductosContext();
  const { busqueda, setBusqueda } = useBusqueda();
    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar: {error}</p>;
    const productosAFiltrar = productos || [];
  const productosFiltrados = productosAFiltrar.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <>
      <input
        type="text"
        placeholder="Buscar productos..."
        className="form-control mb-3"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {productosFiltrados.length > 0 ? (
        productosFiltrados.map((producto) => (
          <div key={producto.id} className="card product-card mx-2">
            <img src={producto.image} className="card-img-top" alt={producto.title} />
            <div className="card-body text-center">
              <h5 className="card-title">{producto.title}</h5>
              <p className="card-text">{producto.price}</p>
              <p className="card-text">{producto.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos que coincidan con la búsqueda.</p>
      )}
    </>
  );
}