import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ContextoGlobal from '../contexts/ContextoGlobal';
import { useContext } from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi';


function CardAuto({ fav, auto }) {

  const navigate = useNavigate();

  const { usuario, eliminarAuto, autos, setAutos, AlertaFavoritos, AlertaQuitarFavoritos} = useContext(ContextoGlobal);

  const pesoChileno = auto.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  


  const setFavorito = (id) => {
    const autoClick = autos.findIndex((f) => f.id === id);
    autos[autoClick].liked = !autos[autoClick].liked;
    setAutos([...autos])
    if (!autos[autoClick].liked) {
      AlertaQuitarFavoritos();
    } else {
      AlertaFavoritos();
    }
  }



console.log(auto);


  const manejarBotonEliminar = () => {
    if (`${usuario.nombre} ${usuario.apellido}` === auto.publicitado_por) {
      // Si el usuario conectado es el mismo que el usuario del auto, mostramos el botón de eliminar
    
      return (
        <>
          <Button className='btnDetallePublicacion' onClick={() => verDetalle()}> <AiOutlineEye /></Button>
          <Button className='btnEditarPublicacion' variant="success" onClick={() => editarPublicacion()}><BsPencil /></Button>
          <Button className='btnEliminarPublicacion' variant="danger" onClick={() => eliminarAuto(auto.id)}><BiTrash /></Button>
        </>
      );
    } else if (`${usuario.nombre} ${usuario.apellido}` !== auto.publicitado_por && `${usuario.conectado}` === 'true') {
      // Si el usuario conectado no es el mismo que el usuario del auto, mostramos corazon y detalle
      return (
        <>
          <Button className='btnDetalle' onClick={() => verDetalle()}><AiOutlineEye /></Button>
          {!fav && (
            <FaHeart
              className='btnFavorito'
              onClick={() => setFavorito(auto.id)}
              style={{
                color: auto.liked ? "red" : "gray",
                display: "flex",
                float: "left"
              }}
            />
          )}
        </>
      );
    } 
     else {
      // Si ninguna de las condiciones anteriores es verdadera mostramos
      return <Button className='btnDetalle' onClick={() => verDetalle()}><AiOutlineEye /></Button>;
    }
  };


  console.log(usuario.conectado);


  const verDetalle = () => {
    navigate(`/detalle/${auto.id}`)
  }

  const editarPublicacion = () => {
    navigate(`/editarPublicacion/${auto.id}`)
  }



  return (

    <div className='cardAutos'>
      <Card className='card d-flex align-items-center justify-content-center' style={{ width: '18rem' }}>
        <div className='image-container'>
          <Card.Img variant="top" src={auto.imagen} style={{ height: '12rem' }} />
          <Card.Img variant="top" src={auto.imagen2} className='hover-image' style={{ height: '12rem' }} />
        </div>
        <Card.Body>
          <Card.Title className='cardTitle' >{auto.titulo}</Card.Title>
          <Card.Text>
            <ul>
              <li>Año:{auto.ano}</li>
              <li>Kilometraje:{auto.kilometraje}</li>
              <li>Dueños:{auto.duenos}</li>
              <li>Transmision:{auto.transmision}</li>
              <li>Precio:{pesoChileno}</li>
              <li>Combustible:{auto.combustible}</li>
            </ul>
            <ul>
              <p>🚗<strong>{auto.publicitado_por}</strong></p>
            </ul>
          </Card.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {manejarBotonEliminar()}
          </div>
        </Card.Body>
      </Card>
    </div>

  );
}

export default CardAuto;