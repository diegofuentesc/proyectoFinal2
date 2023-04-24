import React from 'react';
import { Form, Button, Container, FormGroup } from 'react-bootstrap';
import { useContext } from 'react';
import ContextoGlobal from '../contexts/ContextoGlobal';
import { useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';

const Publicar = () => {

  const { autos, setAutos, usuario, AlertaExitosaPublicacion } = useContext(ContextoGlobal);
  const combustibles = ['Diesel', 'Bencina'];
  const transmisiones = ['Automatico', 'Manual'];
  const estados = ['Nuevo', 'Usado'];
  const {register, formState: {errors}, handleSubmit} = useForm();

  const navigate = useNavigate();

  //const usuarioConectado = lstUsuarios.find(usuario => usuario.nombre);
  //console.log('Usuario actual:', usuario);
  //console.log(autos)
 

  const nuevaPublicacion = (event) => {
    console.log(event);
    event.preventDefault(); // Evita que el formulario se envíe
    AlertaExitosaPublicacion();


    // Obtener los valores ingresados por el usuario
    const titulo = event.target.elements.titulo.value;
    const marca = event.target.elements.marca.value;
    const modelo = event.target.elements.modelo.value;
    const kilometraje = event.target.elements.kilometraje.value;
    const ano = event.target.elements.ano.value;
    const duenos = event.target.elements.duenos.value;
    const combustible = event.target.elements.combustible.options[event.target.elements.combustible.selectedIndex].value;
    const transmision = event.target.elements.transmision.options[event.target.elements.transmision.selectedIndex].value;
    const precio = event.target.elements.precio.value;
    const estado = event.target.elements.estado.options[event.target.elements.estado.selectedIndex].value;
    const detalles = event.target.elements.detalles.value;
    const imagen = event.target.elements.imagen.files[0];
    const imagen2 = event.target.elements.imagen2.files[0];
    const imagen3 = event.target.elements.imagen3.files[0];

    // Agregar un nuevo objeto de usuario al arreglo lstUsuarios
    setAutos([
      ...autos,
      {
        id: autos.length + 1,
        publicitado_por: `${usuario.nombre} ${usuario.apellido}`,
        telefono: `${usuario.telefono}`,
        titulo: titulo,
        marca: marca,
        modelo: modelo,
        kilometraje: kilometraje,
        ano: ano,
        duenos: duenos,
        combustible: combustible,
        transmision: transmision,
        precio: precio,
        estado: estado,
        detalles: detalles,
        imagen: URL.createObjectURL(imagen),
        imagen2: URL.createObjectURL(imagen2),
        imagen3: URL.createObjectURL(imagen3)
      },
    ]
    );

    navigate('/homeprivado');
  }
  return (
    <Container className="formPublicar">
      <h1>Publicar</h1>
      <Form onSubmit={nuevaPublicacion}>
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Titulo publicacion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese titulo publicacion" name='titulo'
        
          />
       
        </Form.Group>
        <Form.Group className="mb-3" controlId="marca">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" placeholder="Ingrese marca" name='marca' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="modelo">
          <Form.Label>Modelo</Form.Label>
          <Form.Control type="text" placeholder="Ingrese correo" name='correo' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="kilometraje">
          <Form.Label>Kilometraje</Form.Label>
          <Form.Control type="text" placeholder="Ingrese kilometraje" name='kilometraje' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ano">
          <Form.Label>Año</Form.Label>
          <Form.Control type="text" placeholder="Ingrese año" name='ano'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="duenos">
          <Form.Label>Dueños anteriores</Form.Label>
          <Form.Control type="text" placeholder="Ingrese cantidad de dueños" name='duenos' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="combustible">
          <Form.Label>Tipo Combustible</Form.Label>
          <Form.Select>
            {combustibles.map((combustible) => (
              <option key={combustible} value={combustible} name='combustible'>
                {combustible}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="transmision">
          <Form.Label>Tipo Transmision</Form.Label>
          <Form.Select>
            {transmisiones.map((transmision) => (
              <option key={transmision} value={transmision} name='transmision'>
                {transmision}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="estado">
          <Form.Label>Condicion</Form.Label>
          <Form.Select>
            {estados.map((estado) => (
              <option key={estado} value={estado} name='condicion'>
                {estado}
              </option>
            ))}
          </Form.Select>
          </Form.Group>
        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="text" placeholder="Ingrese precio" name='precio'/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="detalles">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese descripcion" name='descripcion'/>
        </Form.Group >
        <FormGroup className="mb-3" controlId="imagen">
          <div class="mb-3">
            <label for="formFile" className="form-label">Selecciona una imagen 1</label>
            <input class="form-control" type="file" id="formFile" name="imagen" />
          </div>
        </FormGroup>
        <FormGroup className="mb-3" controlId="imagen2">
          <div class="mb-3">
            <label for="formFile" className="form-label">Selecciona una imagen 2</label>
            <input class="form-control" type="file" id="formFile" name="imagen2" />
          </div>
        </FormGroup>
        <FormGroup className="mb-3" controlId="imagen3">
          <div class="mb-3">
            <label for="formFile" className="form-label">Selecciona una imagen 3</label>
            <input class="form-control" type="file" id="formFile" name="imagen3" />
          </div>
        </FormGroup>
        <div className="btnFormIngresar">
          <Button className="btnPublicar" type="submit">Publicar</Button>
        </div>
      </Form>
    </Container>
  )
}

export default Publicar