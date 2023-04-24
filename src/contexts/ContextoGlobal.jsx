import { createContext } from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export const ContextoGlobal =  createContext();

export const ContextoGlobalProvider = (props) => {
  
  //const [userLogueado, setUserLogueado] = useState(false)
  const [autos, setAutos] = useState([]);

  //Creamos un useState para almacenar la busqueda y capturamos el texto (esto lo ocupamos en el filtro de publicaciones)
  const [search, setSearch] = useState('');

  const [combustibleFilter, setCombustibleFilter] = useState('');

  const [tipoCaja, setTipoCaja] = useState('');

  const [avatar, setAvatar] = useState(null);
  


  const seacher = (e) => {

    setSearch(e.target.value)

  }// fin 

  console.log(autos);

  const eliminarAuto = (id) => {
    setAutos(autos.filter(auto => auto.id !== id));
    AlertaEliminar();
  }

  const getAutos = async () => {
      const res =  await fetch(`http://localhost:3000/autos.json`);
      const data = await res.json(); 
      setAutos(data);
     
  } 
 
  
  useEffect(() => {
      getAutos(); 

  }, []) 


  //Alertas 
  const AlertaExitosa = () => {

    Swal.fire({
      title: 'Sesion Iniciada',
      text: 'Sesion iniciada con exito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 // espera 3 segundos
    });
  }

  const AlertaExitosaPublicacion = () => {

    Swal.fire({
      title: 'Publicacion Creada',
      text: 'publicacion iniciada con exito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 // espera 3 segundos
    });
  }
  
  const AlertaError = () => {

    Swal.fire('Error', 'Correo o contraseña incorrecto', 'error');
  }

  const AlertaEliminar = () => {

    Swal.fire({
      title: 'Publicacion Eliminada',
      text: 'se ha eliminado la publicacion',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000 // espera 3 segundos
    });
  }

  const AlertaEnvioCorreo = () => {

    Swal.fire({
      title: 'Mensaje enviado',
      text: 'Se ha enviado con exito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 // espera 3 segundos
    });
  }
  

  const AlertaFavoritos = () => {

    Swal.fire({
      title: 'Favoritos',
      text: 'se ha agregado a favoritos',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000 // espera 3 segundos
    });
  }

  const AlertaPerfil = () => {

    Swal.fire({
      title: 'Datos actualizados',
      text: 'se ha actualizado el perfil',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000 // espera 3 segundos
    });
  }

  const AlertaQuitarFavoritos = () => {
    Swal.fire({
      title: 'Favoritos',
      text: 'se ha quitado de favoritos',
      icon: 'info',
      showConfirmButton: false,
      timer: 1000
    });
  }

  const AlertaRegistro = () => {

    Swal.fire({
      title: 'Registro exitoso',
      text: 'El usuario ha sido registrado correctamente seras redirigido',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000 // espera 3 segundos
    });
  }

  //fin alertas

  let results = [];

  if (!search) {
    results = autos;
  } else {
    results = autos.filter((dato) =>
      dato.titulo.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (combustibleFilter) {
    results = results.filter(
      (auto) => auto.combustible.toLowerCase() === combustibleFilter.toLowerCase()
    );
  }

  if (tipoCaja) {
    results = results.filter(
      (auto) => auto.transmision.toLowerCase() === tipoCaja.toLowerCase()
    );
  }

  const [modal, setModal] = useState(false);

    


  //Usuarios registrados
  const [usuario, setUsuario] = useState({});
    const [lstUsuarios, setLstUsuarios] = useState ([
      {   
          id:1,
          nombre: 'Diego',
          apellido: 'Fuentes',
          email: 'dfuentes@gmail.com',
          telefono: 951697236,
          clave: '1234',
          avatar: 'avatar1'
      },  
          
       
      {   id:2,
          nombre: 'Juan',
          apellido: 'Gomez',
          email: 'juan@gmail.com',
          telefono:951068758,
          clave: '123456',
          avatar: 'avatar2'
      }
  ]);

  //fin usuarios

  
 
    return (

        <ContextoGlobal.Provider value={{results, avatar, setAvatar, autos, setAutos, lstUsuarios,setLstUsuarios, setUsuario, usuario, AlertaExitosaPublicacion, AlertaEnvioCorreo, AlertaPerfil, AlertaQuitarFavoritos, AlertaFavoritos, AlertaError, AlertaExitosa, AlertaRegistro, getAutos, search, seacher, combustibleFilter, setCombustibleFilter, tipoCaja, setTipoCaja, modal, setModal, eliminarAuto}}>

          {props.children}
          
        </ContextoGlobal.Provider>
    )
}



export default ContextoGlobal;
