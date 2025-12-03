import React from 'react';
import ProductosFiltrados from '../components/ProductosFiltrados';
import TarjetaDetalle from '../components/TarjetaDetalle'; 
import { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

// Componente wrapper para un producto individual
const TarjetaModaWrapper = ({ producto }) => {
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

// Componente principal de la página de Moda
const Moda = () => {
    // 1. Obtener productos de HOMBRE
    const { 
        productos: productosHombre, 
        cargando: cargandoHombre, 
        error: errorHombre 
    } = ProductosFiltrados("men's clothing");

    // 2. Obtener productos de MUJER
    const { 
        productos: productosMujer, 
        cargando: cargandoMujer, 
        error: errorMujer 
    } = ProductosFiltrados("women's clothing");

    // Manejo de estados de carga y error (si cualquiera está cargando o tiene error)
    if (cargandoHombre || cargandoMujer) {
        return <h2 className="text-center my-5">...Cargando Moda...</h2>;
    }
    
    // Mostramos un error si cualquiera de las llamadas falló
    if (errorHombre || errorMujer) {
        return <p className="alert alert-danger my-5">Error al cargar productos de moda.</p>;
    }
    
    // Juntar ambos arrays en uno solo para mapear
    const todosLosProductos = [...productosHombre, ...productosMujer];

    return (
        <div className="container my-4">
            <h1 className="mb-4 text-center">Catálogo de Moda</h1>

            {/* Grilla para todos los productos */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {/* Mapeamos el array combinado */}
                {todosLosProductos.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaModaWrapper
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
             <h1 className="mb-4 text-center my-4">Hombres</h1>
            {/* Grilla para productos de hombre */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                {productosHombre.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaModaWrapper
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
             <h1 className="mb-4 text-center my-4">Mujeres</h1>

            {/* Grilla para los productos de mujer */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                
                {productosMujer.map((producto) => (
                    <div key={producto.id} className="col">
                        <TarjetaModaWrapper 
                            producto={producto} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Moda;