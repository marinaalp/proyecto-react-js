import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TarjetaDetalle from "../components/TarjetaDetalle";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const resp = await fetch(
          `https://68dc73387cd1948060aa52c6.mockapi.io/api-proyecto-v1/productos/${id}`
        );

        if (!resp.ok) {
          console.log("ID no encontrado:", id);
          setProducto(null);
          return;
        }

        const data = await resp.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (cargando) return <p>Cargando detalle...</p>;
  if (!producto) return <p>No existe un producto con ID: {id}</p>;

  return (
  <>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-12 col md-8">  
        <TarjetaDetalle producto={producto} />
      </div>
    </div>    
  </div>
  </>
  );
};

export default ProductoDetalle;
