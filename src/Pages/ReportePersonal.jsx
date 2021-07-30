import React,{useEffect,useState,useContext}  from 'react'
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from 'react-flatpickr';
import axios from 'axios'
import userContext from '../context/UserContext'

const url = 'https://satt.transporte.gob.hn:206/api/Estadisticas';

const ReportePersonal = () => {
    const {infoUsuario} = useContext(userContext);
    const [ListadoSolicitudes, setListado] = useState(null);
    const [rangoFechas,setFecha] = useState({Inicio:null, Fin:null});
    const [actualizar,setActualizar] =useState(true)
    const datosTabla= {encabezado : ['Tramite','Cantidad','Total']};
  
    const usuario = infoUsuario.usuario;

    const verificarFechas = (fecha,tipo) => {
        if (tipo==="inicial") {
            setFecha({...rangoFechas,Inicio: fecha.toISOString().substring(0,10)})
          }else{
            setFecha({...rangoFechas,Fin: fecha.toISOString().substring(0,10)})
          }
      }

    const validar = () => {
        if (rangoFechas.Inicio !==null && rangoFechas.Fin !==null ) {
            setActualizar(true);
        }
    }


    const  GenerarPDF = async ()=>{
        let rangofecha ='';
        if (rangoFechas.Inicio !== null && rangoFechas.Fin !== null) {
            rangofecha = `/${rangoFechas.Inicio}/${rangoFechas.Fin}`;
        }
        await axios.get(`https://satt.transporte.gob.hn:206/api/Estadisticas/ReportePersonal/${infoUsuario.usuario}${rangofecha}`, {
            headers:{
                'Content-type': 'application/json'
             },
             responseType: 'blob'
         })
         .then(response => {
             console.log(response.data);
             const comprobanteSolicitud = new Blob([response.data],{type: 'application/pdf'});

             const fileUrl = URL.createObjectURL(comprobanteSolicitud);

             window.open(fileUrl);
         }).catch(error => {
             console.log(error);
         })
    }

    useEffect(()=>{
        if (actualizar) {
              
            const getListadoSolicitudesUsuario = async(user) => {
       
       
        let rangofecha='';
        if (rangoFechas.Inicio !== null && rangoFechas.Fin !== null) {
            rangofecha = `${rangoFechas.Inicio}/${rangoFechas.Fin}`;
        }

        const requestSolicitudesUsuario = await axios.get(`${url}/SolicitudesUsuario/${user}/${rangofecha}`)
        const requestEscritosPermisosCertificados = await axios.get(`${url}/PermisosCertificadosEscritosUsuario/${usuario}/${rangofecha}`)
        
        Promise.all([requestSolicitudesUsuario,requestEscritosPermisosCertificados]).then(([data, totales])=>{
            
            let datos = data.data
            let total= totales.data
            if (datos.length !== 0) {
                const listado = {
                    solicitudesComunes: datos.filter(s => s.Tramites.some(t => t.ClaseTramite !=="COMPENSACION DE TASA UNICA VEHICULAR ANUAL" &&  t.ClaseTramite !== "BENEFICIO DE REACTIVACION")),
                   BeneficioReactivacion : datos.filter(s => s.Tramites.some(t => t.ClaseTramite === "BENEFICIO DE REACTIVACION")).length,
                    CompensasionTasaVehicular : datos.filter(s => s.Tramites.some(t => t.ClaseTramite === "COMPENSACION DE TASA UNICA VEHICULAR ANUAL")).length,
                    Escritos : total.Escritos,
                    Permisos : total.Permisos,
                   Certificados : total.Certificados
               }
               setListado(listado);
            }         
        })

            }
            getListadoSolicitudesUsuario(usuario)
            setActualizar(false);
        }
    },[actualizar,rangoFechas,usuario])

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <h5>Reporte Personal</h5>
            </div>
            <div className="row">
                <div className="col-xl-5 col-sm-5 mb-xl-0 mb-4">
                    <div className="form-group">
                        <label htmlFor="fechaInicio">Fecha Inicial</label>
                        <div className="input-group">
                            <Flatpickr id="fechaInicio" className="form-control" options={{
                    disable: [(date) =>{
                      return (date > new Date())
                    }],
                    defaultDate: new Date()
                  }} onChange={(fecha)=> verificarFechas(fecha[0],'inicial') }
                                />
                                <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 col-sm-5 mb-xl-0 mb-4">
                    <div className="form-group">
                        <label htmlFor="fechaFinal">Fecha Final</label>
                        <div className="input-group">
                            <Flatpickr id="fechaFinal" className="form-control" options={{
                      disable: [(date) =>{
                        return (date > new Date())
                      }],
                      defaultDate: new Date()
                    }} onChange={fecha=> verificarFechas(fecha[0],'final')}
                                />
                                <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-sm-2 mb-xl-0 mb-4">
                    <div className="form-group p-4">
                        <div className="text-center">
                            <button type="button" className="btn bg-gradient-primary" onClick={()=>validar()}>
                                <span className="btn-inner--icon"><i className="ni ni-spaceship"></i></span>
                                <span className="btn-inner--text"> Buscar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-md-0 mb-4">
                    <div className="card">
                        <div className="card-header pb-0">
                           <div className="row">
                               <div className="col-lg-6 col-7">
                                    <h6>MI Trabajo</h6>
                                    <p className="text-sm mb-0">
                                        <i className="fa fa-check text-info" aria-hidden="true"></i>
                                        <span className="font-weight-bold ms-1">
                                            {infoUsuario.perfil.Nombre}
                                        </span>
                                    </p>
                               </div>
                               <div className="col-lg-6 col-5 my-auto text-end">
                                    <p className="text-sm mb-0">
                                        <i className="fas fa-arrow-down" aria-hidden="true"></i>
                                        <span className="font-weight-bold ms-1">
                                            Descargar Reporte
                                        </span>
                                    </p>
                                    <button className="btn btn-icon btn-3 btn-outline-danger" 
                                        type="button" 
                                        style={{marginRight: "5px"}}
                                        onClick={GenerarPDF}
                                    >
                                        <span className="btn-inner--icon"><i className="fas fa-file-pdf"></i></span>
                                        <span className="btn-inner--text ml-2">PDF</span>
                                    </button>
                                    {/* <button className="btn btn-icon btn-3 btn-outline-success" type="button">
                                        <span className="btn-inner--icon"><i className="far fa-file-excel"></i></span>
                                        <span className="btn-inner--text ml-2">Excel</span>
                                    </button> */}
                               </div>
                           </div>
                        </div>

                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr className="bg-gradient-info">
                                            {
                                            datosTabla.encabezado.map( (encabezado, index)=>(
                                            <th key={index}
                                                className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-8  text-center text-white">
                                                {encabezado}
                                            </th>
                                            ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ListadoSolicitudes === null ? (
                                                <tr className="bg-gradient-warning">
                                                    <td colSpan={3} className="text-white text-center">Sin Trabajo Realizado</td>
                                                </tr>
                                            ) :
                                            (
                                                <>
                                                    <tr >
                                                        <td className="align-middle text-center text-sm">Solicitudes Comunes</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.solicitudesComunes.length}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} 
                                                            className="align-middle text-center text-sm text-uppercase font-weight-bold bg-gradient-secondary text-white">
                                                            total solicitudes
                                                        </td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.solicitudesComunes.length}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle text-center text-sm">Beneficio de Reactivación</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.BeneficioReactivacion}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle text-center text-sm">Compensación de tasa unica vehicular</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.CompensasionTasaVehicular}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} 
                                                            className="align-middle text-center text-sm text-uppercase font-weight-bold bg-gradient-secondary text-white">
                                                                total beneficios
                                                        </td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.BeneficioReactivacion + ListadoSolicitudes.CompensasionTasaVehicular}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle text-center text-sm">Escritos</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.Escritos}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} 
                                                            className="align-middle text-center text-sm text-uppercase font-weight-bold bg-gradient-secondary text-white">
                                                            total escritos
                                                        </td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.Escritos}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle text-center text-sm">Permisos de Operacion Entregados</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.Permisos}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="align-middle text-center text-sm">Certificados de Operacion Entregados</td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.Certificados}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} 
                                                            className="align-middle text-center text-sm text-uppercase font-weight-bold bg-gradient-secondary text-white">
                                                            total entregas
                                                        </td>
                                                        <td className="align-middle text-center text-sm">{ListadoSolicitudes.Permisos + ListadoSolicitudes.Certificados}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportePersonal
