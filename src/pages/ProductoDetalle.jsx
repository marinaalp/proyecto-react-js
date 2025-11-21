import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TarjetaDetalle from "../components/TarjetaDetalle";

const ProductoDetalle = () => {

  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://68dc73387cd1948060aa52c6.mockapi.io/api-proyecto-v1/productos/${id}`)
      .then(respuesta => respuesta.json())
      .then(dato => setProducto(dato));
  }, [id]);

  if (!producto)
    return <p>Cargando ......</p>

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-8">
            <TarjetaDetalle producto={producto} />
          </div>

        </div>
      </div>


    </>

  );
}

export default ProductoDetalle;