import React, {useReducer} from 'react'
import axios from 'axios';

import SievReducer from './SievReducer';
import SIEVcontext from './SievContexts';

import {
    GET_TOTALES,
    GET_SOLICITUDES_POR_REGIONALES,
    GET_SOLICITUDES_POR_CATEGORIA,
    GET_SOLICITUDES_POR_TRAMITE
} from "./types";

const SIEVState = (props) => {
    const initialState = {
        totales:[
            {solicitudes: null},
            {escritos: null},
            {permisos: null},
            {certificados:null}
        ],
        TotalPorRegional:[],
        TotalPorCategoria:[],
        TotalPorTramite:[]
    };

    const [state, dispatch] = useReducer(SievReducer, initialState);
 
    const getTotalesVentanilla = async(fechas) =>{

        const solicitudes = await axios.post(`https://satt.transporte.gob.hn:206/api/Estadisticas/TotalSolicitudes`,{
            totalDeaseado: 'solicitudes',
            fechaInicio: fechas.Inicio,
            fechaFinal: fechas.Fin
        })

        const escritos = await axios.post(`https://satt.transporte.gob.hn:206/api/Estadisticas/TotalSolicitudes`,{
            totalDeaseado: 'escritos',
            fechaInicio: fechas.Inicio,
            fechaFinal: fechas.Fin
        })

        const permisosEntregados = await axios.post(`https://satt.transporte.gob.hn:206/api/Estadisticas/TotalSolicitudes`,{
            totalDeaseado: 'permisos',
            fechaInicio: fechas.Inicio,
            fechaFinal:  fechas.Fin
        })

        const certificadosEntregados = await axios.post(`https://satt.transporte.gob.hn:206/api/Estadisticas/TotalSolicitudes`,{
            totalDeaseado: 'certificados',
            fechaInicio: fechas.Inicio,
            fechaFinal: fechas.Fin
        })

        Promise.all([solicitudes,escritos,permisosEntregados,certificadosEntregados]).then((results)=>{
            let data =[];
            data[0] = results[0].data;
            data[1] = results[1].data;
            data[2] = results[2].data;
            data[3] = results[3].data;
            console.log(data);
            dispatch({
                type: GET_TOTALES,
                payload: data
            })    
        });        
    }

    const getTotalPorRegionales = async(fechas) => {
        const requestRegionales = await axios.post(`https://satt.transporte.gob.hn:206/api/Estadisticas/TotalRegionales`,{
            totalDeaseado: 'regionales',
            fechaInicio: fechas.Inicio,
            fechaFinal: fechas.Fin
        })
        const data =  requestRegionales.data;
        dispatch({
            type: GET_SOLICITUDES_POR_REGIONALES,
            payload: data
        })   

    }

    const getTotalSolicitudesPorCategoria = async(fechas) => {
        let url =`https://satt.transporte.gob.hn:206/api/Estadisticas/SolicitudesPorCategoria`
        if (fechas.Inicio !== null) {
            url += `/${fechas.Inicio}/${fechas.Fin}`
        }
        const solicitudesPorCategoria = await axios.get(url);
        const data = solicitudesPorCategoria.data;
        dispatch({
            type: GET_SOLICITUDES_POR_CATEGORIA,
            payload: data
        })   
    }

    const getTotalSolicitudesPorTramite = async(fechas) => {
    
        let url =`https://satt.transporte.gob.hn:206/api/Estadisticas/SolicitudesPorTramite`
        if (fechas.Inicio !== null) {
            url += `/${fechas.Inicio}/${fechas.Fin}`
        }
      
        const request = await axios.get(url);
        const data = request.data;
        dispatch({
            type: GET_SOLICITUDES_POR_TRAMITE,
            payload: data
        })   
    }

    return(
        <SIEVcontext.Provider value={{
            totales : state.totales,
            TotalPorRegional: state.TotalPorRegional,
            TotalPorCategoria: state.TotalPorCategoria,
            TotalPorTramite: state.TotalPorTramite,
            getTotalesVentanilla,
            getTotalPorRegionales,
            getTotalSolicitudesPorCategoria,
            getTotalSolicitudesPorTramite
        }}>
            {props.children}
        </SIEVcontext.Provider>
    )
}


export default SIEVState;