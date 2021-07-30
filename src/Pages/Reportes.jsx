import React,{useState,useContext} from 'react'
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from 'react-flatpickr';
import axios from 'axios'
import userContext from '../context/UserContext'
const Reportes = () => {
    
    const {infoUsuario} = useContext(userContext);
    const [rangoFechas,setFecha] = useState({Inicio:null, Fin:null});
    // const [actualizar,setActualizar] =useState(true)
    const [regional, setRegional] = useState({id:'TGU', descripcion:'Tegucigalpa'})
    const regionales =[
        {id: 'TGU',descripcion:"Tegucigalpa"},
        {id:'SPS', descripcion: "San Pedro Sula"}, 
        {id:'CEI', descripcion:"Ceiba"}, 
        {id:'CHO', descripcion:"Choluteca"}];
    
      const verificarFechas = (fecha,tipo) => {
        if (tipo==="inicial") {
            setFecha({...rangoFechas,Inicio: fecha.toISOString().substring(0,10)})
          }else{
            setFecha({...rangoFechas,Fin: fecha.toISOString().substring(0,10)})
          }
      }

      const validar = () => {
        // if (rangoFechas.Inicio !==null && rangoFechas.Fin !==null ) {
        //     setActualizar(true);
        // }
      }

      const  GenerarPDF = async ()=>{
        let rangofecha ='';
        if (rangoFechas.Inicio !== null && rangoFechas.Fin !== null) {
            rangofecha = `${rangoFechas.Inicio}/${rangoFechas.Fin}`;
        }
        await axios.get(`https://satt.transporte.gob.hn:206/api/Estadisticas/ReporteRegional/${infoUsuario.usuario}/${regional.id}/${rangofecha}`, {
            headers:{
                'Content-type': 'application/json'
             },
             responseType: 'blob'
         })
         .then(response => {
             const comprobanteSolicitud = new Blob([response.data],{type: 'application/pdf'});
             const fileUrl = URL.createObjectURL(comprobanteSolicitud);
             window.open(fileUrl);
         }).catch(error => {
             console.log(error);
         })

         axios.get(`https://satt.transporte.gob.hn:206/api/Estadisticas/ReporteRegionalEspecifico/${infoUsuario.usuario}/${regional.id}/${rangofecha}`, 
         {
           headers:{
              'Content-type': 'application/json'
           },
           responseType: 'blob'
          }
         ).then(response => {
          const comprobanteSolicitud = new Blob([response.data],{type: 'application/pdf'});
          const fileUrl = URL.createObjectURL(comprobanteSolicitud);
          window.open(fileUrl);
        }).catch(error => {
          console.log(error);
        })

      }

      const cambiarRegional = (id) => {
          setRegional(regionales.find(r => r.id === id))
      }


    return (
        <div className="container-fluid py-4">
            <div className="row">
                <h5>Reporte Regional</h5>
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
            <div className="card h-100 col-4">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Reporte</h6>                 
                    </div>
                    <div className="col-lg-6 col-5 my-auto text-end">
                            <div className="dropdown float-lg-end pe-4">
                            <span className="btn bg-gradient-dark dropdown-toggle" 
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
                <div className="card-body p-3 pb-0">
                  <ul className="list-group">
                    <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                      <div className="d-flex flex-column">
                        <h6 className="mb-1 text-dark font-weight-bold text-sm">Reporte General Regional {regional.descripcion}</h6>
                      </div>
                      <div className="d-flex align-items-center text-sm">
                        <button className="btn btn-link text-dark text-sm mb-0 px-0 ms-4" onClick={GenerarPDF}>
                            <i className="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i> PDF</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Reportes
