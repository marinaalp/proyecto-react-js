const Contacto = () => {
  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">

        <h2>Contacto</h2>
        <h1 className="display-3 fw-bold">Diseñado por Marina Lencinas</h1>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/xL8Lot5xHyQ"
            title="Poder Perruno"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>

        <h3 className="fw-normal text-muted mb-3"> Entrega Final del curso de React. </h3>
        <h4 className="fw-normal text-muted mb-3">
          Incluye carrito de compras y secciones de moda, tecnologia y joyas</h4>
        <h5 className="fw-normal text-muted mb-3">¡Gracias profe por recordarme en cada clase a este querido personaje de mi infancia! Su muletilla ta ra ta ta ta ta me acompaño cada jueves</h5>
      </div>
    </>

  );
}

export default Contacto;