import ProductosFiltrados from '../components/ProductosFiltrados';
import TarjetaDetalle from '../components/TarjetaDetalle';
import { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

// Componente wrapper para un producto individual
const TarjetaTecnologiaWrapper = ({ producto }) => {
    // hooks necesarios
    const [cantidad] = useState(1);
    const [agregado, setAgregado] = useState(false);
    const { agregarAlCarrito } = useContext(CarritoContext);

    // Handlers de interaccion
    const handleAgregarAlCarrito = () => {
        for (let i = 0; i < cantidad; i++) {    
            agregarAlCarrito(producto);
        }
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000); // Resetea el estado despues de 2 segundos
    };


    return (
        <TarjetaDetalle
            producto={producto}
            agregado={agregado}
            onAgregar={handleAgregarAlCarrito}
            mostrarVerCarrito={false}
        />
    );
};

const Tecnologia = () => {
    // 💡 Usamos el hook, pasando la categoría deseada: "electronics"
    const { productos, cargando, error } = ProductosFiltrados("electronics");

    if (cargando) return <h2 className="text-center my-5">...Cargando Tecnología...</h2>;
    if (error) return <p className="alert alert-danger my-5">{error}</p>;

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Tecnología</h1>

            {/* Mapeamos el listado filtrado */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productos.map((producto) => (
                    <div key={producto.id} className="col">
                        {/* Usamos TarjetaDetalle para el renderizado */}
                        <TarjetaTecnologiaWrapper
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tecnologia;