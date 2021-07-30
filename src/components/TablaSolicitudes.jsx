import React, {useEffect,useState} from 'react'
import Tabla from './Tabla'
import axios from 'axios';

const TablaSolicitudes = ({fechas, actualizar}) => {
    const [solicitudesPorUsuario,setSolicitudesPorUsuario] =useState([]);
    const regionales =[
        {id: 'TGU',descripcion:"Tegucigalpa"},
        {id:'SPS', descripcion: "San Pedro Sula"}, 
        {id:'CEI', descripcion:"Ceiba"}, 
        {id:'CHO', descripcion:"Choluteca"}];
    const [datosTabla, setDatosTabla]= useState(
            {
                encabezado : ['Usuario','Solicitudes','Porcentaje'],
                regional: "TGU"
            }
    );

    const cambiarRegional = (regional) =>{
       
        setDatosTabla(prevDatosTabla =>({
            ...prevDatosTabla,
            regional: regional
        }));
    }



    useEffect(()=>{
        const getSolicitudesPorUsuario = async(fechas) => {
            console.log(fechas)
            let rangofecha='';
            if (fechas.Inicio !==null && fechas.Fin !== null) {
                rangofecha = `${fechas.Inicio}/${fechas.Fin}`;
            }
            const requestRegionales = await axios.get(`https://satt.transporte.gob.hn:206/api/Estadisticas/SolicitudesPorUsuario/${rangofecha}`)
            const data =  requestRegionales.data;
            setSolicitudesPorUsuario(data);
           
        }
        if (actualizar) {
            getSolicitudesPorUsuario(fechas)
        }

    },[actualizar,fechas])

    return (
        <div className="col-lg-7 col-md-6 mb-md-0 mb-4">
            <div className="card">
                <div className="card-header pb-0">
                    <div className="row">
                        <div className="col-lg-6 col-7">
                            <h6>Solicitudes Recibidas por Usuario</h6>
                            <p className="text-sm mb-0">
                                <i className="fa fa-check text-info" aria-hidden="true"></i>
                                <span className="font-weight-bold ms-1">
                                    {
                                        regionales.find(r => r.id === datosTabla.regional).descripcion
                                    }
                                </span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-5 my-auto text-end">
                            <div className="dropdown float-lg-end pe-4">
                            <span  className="btn bg-gradient-dark dropdown-toggle" 
                                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                               <i className="ni ni-square-pin"></i> Regional
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><span className="dropdown-item" onClick={(e)=> cambiarRegional('TGU')}>Tegucigalpa</span></li>
                                <li><span className="dropdown-item" onClick={(e)=> cambiarRegional('SPS')}>San Pedro Sula</span></li>
                                <li><span className="dropdown-item" onClick={(e)=> cambiarRegional('CEI')}>Ceiba</span></li>
                                <li><span className="dropdown-item" onClick={(e)=> cambiarRegional('CHO')}>Choluteca</span></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-0 pb-2">
                    {
                        solicitudesPorUsuario.length>0 && (<Tabla parametrosTabla={datosTabla} datos={solicitudesPorUsuario}></Tabla>)
                    }
                </div>
            </div>
        </div>
    )
}

export default TablaSolicitudes
