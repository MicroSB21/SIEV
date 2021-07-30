import React, {useReducer,useEffect} from 'react'
import axios from 'axios';

import UserReducer from './UserReducer';
import userContext from './UserContext';

import { INICIAR_SESION_USUARIO,LOADING,USUARIO_ERROR, CERRAR_SESION_USUARIO } from './types'

const UserState = (props) => {
    const initialState = {
        inicioSesion : false,
        loading : false,
        datos :[]
    };

    const LoginApiParametros = {
        appid : "89b473b3ea9d5b6719c8ee8ce0c247d5",
        modulo : "1",
        action : "do-login-web",
        nombre : "",
        password: ""
    }

    const URLAPI = 'https://satt.transporte.gob.hn:84/api_login.php';

    const [state,dispatch] = useReducer(UserReducer,initialState);

    useEffect(()=>{
        if (localStorage.getItem('usuario')) {
            dispatch({
                type: INICIAR_SESION_USUARIO,
                payload : JSON.parse(localStorage.getItem('usuario'))
            })
        }
    },[])

    const IniciarSesion = async (usuario,contrasena)  => {
        dispatch({
            type: LOADING
        })
        
        LoginApiParametros.nombre = usuario;
        LoginApiParametros.password = contrasena;

      const formData = new FormData();

      formData.append("appid", LoginApiParametros.appid)
      formData.append("modulo", LoginApiParametros.modulo)
      formData.append("action", LoginApiParametros.action)
      formData.append("nombre", LoginApiParametros.nombre)
      formData.append("password", LoginApiParametros.password)

      const requestLogueo = await axios.post(`${URLAPI}`, formData,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
      });
      const info = requestLogueo.data;
      if (info[0].result !== -1) {
          let data = info[1];
          let tienePermiso =data.roles.some(r => r.modulo ===LoginApiParametros.modulo);
          if (tienePermiso) {
              dispatch({
                  type: INICIAR_SESION_USUARIO,
                  payload: data
              }) 
              localStorage.setItem('usuario', JSON.stringify(data)); 
          }else{
              console.log('no tenes permiso papu')
              dispatch({
                  type: USUARIO_ERROR
              })
          }
      }else{
          dispatch({
              type: USUARIO_ERROR
          })
      }
    }

    const CerrarSesion = () =>{
        localStorage.removeItem('usuario');
        dispatch({
            type: CERRAR_SESION_USUARIO
        });
    }

    return(
        <userContext.Provider
            value={{
                infoUsuario: state.datos,
                inicioSesion : state.inicioSesion,
                loading : state.loading,
                IniciarSesion,
                CerrarSesion
              
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;