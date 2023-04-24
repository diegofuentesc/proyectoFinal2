import { useContext, useState } from 'react';
import { Col, Form, ListGroup, Row, Button, Container } from 'react-bootstrap';
import ContextoGlobal from '../contexts/ContextoGlobal';
import CardAuto from '../components/CardAuto';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const Usado = () => {
  const { seacher, search, autos, setAutos, setCombustibleFilter, setTipoCaja, results } = useContext(ContextoGlobal);
  const [orden, setOrden] = useState('ascendente');

  const sortData = () => {
    const sortedData = [...autos].sort((a, b) => {
      if (orden === 'ascendente') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
    setAutos(sortedData);
    setOrden(orden === 'ascendente' ? 'descendente' : 'ascendente');
  };

  const limpiarFiltros = () => {
    setCombustibleFilter();
    setTipoCaja();
    setOrden('ascendente');
    setAutos(autos);
    seacher({target: {value: ""}});
  };
  
  const publicacionesUsuario = results.filter((auto) => {
    return auto.estado === 'usado';
  });


  return (
    <Row className='publicados'>
    <Col md={3} className='filtros'>
      <ListGroup>
        <ListGroup.Item>
          <Form.Control value={search} onChange={seacher} type="text" placeholder="Buscar por modelo" />
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={sortData} className='btnFiltros w-100 text-center'>
            {orden === 'ascendente' ? 'Precio' : 'Precio'}
            {orden === 'ascendente' ? <FiChevronUp /> : <FiChevronDown />}
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => setTipoCaja('Automatico')} className='btnFiltros w-100 text-center'>Automatico</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => setTipoCaja('Manual')} className='btnFiltros w-100 text-center'>Manual</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => setCombustibleFilter('Bencina')} className='btnFiltros w-100 text-center'>Bencina</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={() => setCombustibleFilter('Diesel')} className='btnFiltros w-100 text-center'>Diésel</Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={limpiarFiltros}>Limpiar filtros</Button>
        </ListGroup.Item>
      </ListGroup>
    </Col>
    <Col md={9} className='publicadoGaleria'>
        <h3 className='tituloNuevos'>Autos Usados</h3>
        <Container className="galeria">
        <Row md={4}>
        {publicacionesUsuario.map((auto) => {
          return (
            
            <Col key={auto.id}>
              <CardAuto auto={auto} />
            </Col>
           
          );
        })}

          </Row>
          </Container>

    </Col>
    
  </Row>

  )
}

export default Usado