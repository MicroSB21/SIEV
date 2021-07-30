import {
    INICIAR_SESION_USUARIO, 
    LOADING, 
    USUARIO_ERROR,
    CERRAR_SESION_USUARIO} from './types'



const UserReducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case INICIAR_SESION_USUARIO:
            return {
                ...state,
                datos : payload,
                inicioSesion: true,
                loading: false
            }
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...state, loading:false}
        case CERRAR_SESION_USUARIO:
            return {...state, loading:false, inicioSesion: false, datos:[]}
        default:
            return state;
    }
}

export default UserReducer
