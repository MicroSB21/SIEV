import {
    GET_TOTALES,
    GET_SOLICITUDES_POR_REGIONALES,
    GET_SOLICITUDES_POR_CATEGORIA,
    GET_SOLICITUDES_POR_TRAMITE
} from './types'

const reducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case GET_TOTALES:
            return {
                ...state,
                totales: {
                    solicitudes: payload[0],
                    escritos: payload[1],
                    permisos: payload[2],
                    certificados: payload[3]
                }
            };
        case GET_SOLICITUDES_POR_REGIONALES:
            return {
                ...state,
                TotalPorRegional : payload
            }
        case GET_SOLICITUDES_POR_CATEGORIA:
            return {
                ...state,
                TotalPorCategoria : payload
            }
        case GET_SOLICITUDES_POR_TRAMITE:
            return {
                ...state,
                TotalPorTramite : payload
            }
        default:
            return state;
    }
}
export default reducer;