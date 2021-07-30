import React, {useContext, useEffect,useState} from 'react'
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from 'react-flatpickr';
import SIEVcontext from '../context/SievContexts'
import ContadorCard from './ContadorCard'
import TotalesGrafico from './TotalesGrafico'
import GraficoSolicitudesPorCategoria from './GraficoSolicitudesPorCategoria';
import SolicitudesPorTramite from './SolicitudesPorTramite';
import TablaSolicitudes from './TablaSolicitudes';
import axios from 'axios'

const Dashboard = () => {

    const { 
      getTotalesVentanilla, 
      totales, 
      getTotalPorRegionales,
      TotalPorRegional,
      TotalPorCategoria,
      getTotalSolicitudesPorCategoria,
      TotalPorTramite,
      getTotalSolicitudesPorTramite
    } = useContext(SIEVcontext)

    const dataSolicitudes = {...totales.solicitudes}
    const datosEscritos = {...totales.escritos}
    const datosPermisos = {...totales.permisos}
    const datosCertificados = {...totales.certificados}

    const [rangoFechas,setFecha] = useState({Inicio:null, Fin:null});
    const [actualizar,setActualizar] =useState(true)

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

    const descargarReporteGeneral = async () =>{
      let fechas ='';
      if (rangoFechas.Inicio != null && rangoFechas.Fin != null) {
        fechas = `/${rangoFechas.Inicio}/${rangoFechas.Fin}`
      }
      await axios.get(`https://satt.transporte.gob.hn:206/api/Estadisticas/ReporteGeneral${fechas}`, {
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
    }

    useEffect(()=>{
      if (actualizar) {
        getTotalesVentanilla(rangoFechas);
        getTotalPorRegionales(rangoFechas);
        getTotalSolicitudesPorCategoria(rangoFechas);
        getTotalSolicitudesPorTramite(rangoFechas);
        setActualizar(false)
      }
    },[actualizar,rangoFechas,getTotalesVentanilla,getTotalPorRegionales,getTotalSolicitudesPorCategoria,getTotalSolicitudesPorTramite])

    return (
        <div className="container-fluid py-4">
        <div className="row">
          <div className= "col-xl-5 col-sm-5 mb-xl-0 mb-4">
            <div className="form-group">
              <label htmlFor="fechaInicio">Fecha Inicial</label>
              <div className="input-group">
                <Flatpickr id="fechaInicio" 
                  className="form-control" 
                 
                  options={{
                    disable: [(date) =>{
                      return (date > new Date())
                    }],
                    defaultDate: new Date()
                  }}
                  onChange={(fecha)=> verificarFechas(fecha[0],'inicial') }
                />
                <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
              </div>
            </div>
          </div>
          <div className= "col-xl-5 col-sm-5 mb-xl-0 mb-4">
            <div className="form-group">
              <label htmlFor="fechaFinal">Fecha Final</label>
                <div className="input-group">
                  <Flatpickr id="fechaFinal" 
                    className="form-control" 
                    
                    options={{
                      disable: [(date) =>{
                        return (date > new Date())
                      }],
                      defaultDate: new Date()
                    }}
                    onChange={fecha => verificarFechas(fecha[0],'final')}
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
                <button type="button" className="btn bg-gradient-primary" onClick={()=>descargarReporteGeneral()}>
                  <span className="btn-inner--icon"><i className="fas fa-file-pdf"></i></span>
                  <span className="btn-inner--text">  Descargar Reporte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {totales.solicitudes&&(
              <ContadorCard 
                porcentaje={dataSolicitudes.DiferenciaPorcentual} 
                encabezado={'Solicitudes Recibidas'} 
                total={dataSolicitudes.ValorActual}
                AumentoProduccion = {dataSolicitudes.AumentoProduccion}
                icono={"ni ni-archive-2"}
              />
          )}

          {totales.escritos&&(
              <ContadorCard 
                porcentaje={datosEscritos.DiferenciaPorcentual} 
                encabezado={'Escritos'} 
                total={datosEscritos.ValorActual}
                AumentoProduccion = {datosEscritos.AumentoProduccion}
                icono={"ni ni-single-copy-04"}
              />
          )}

          {totales.permisos&&(
              <ContadorCard 
                porcentaje={datosPermisos.DiferenciaPorcentual} 
                encabezado={'Permisos Entregados'} 
                total={datosPermisos.ValorActual}
                AumentoProduccion = {datosPermisos.AumentoProduccion}
                icono={"ni ni-book-bookmark"}
              />
          )}

          {totales.certificados&&(
              <ContadorCard 
                porcentaje={datosCertificados.DiferenciaPorcentual} 
                encabezado={'Certificados Entregados'} 
                total={datosCertificados.ValorActual}
                AumentoProduccion = {datosCertificados.AumentoProduccion}
                icono={"ni ni-paper-diploma"}
              />
          )}        
        </div>

        <div className="row mt-4">
          <div className="col-lg-5 mb-lg-0 mb-4">
            {TotalPorRegional.length > 0 && (<TotalesGrafico totales={TotalPorRegional}></TotalesGrafico>)}
          </div>
          <div className="col-lg-7 mb-lg-0 mb-4">
            {TotalPorCategoria.length>0 && (<GraficoSolicitudesPorCategoria solicitudesPorCategoria={TotalPorCategoria} />)}
          </div>
        </div>
        <div className="row my-4">
          <TablaSolicitudes fechas={rangoFechas} actualizar={actualizar}></TablaSolicitudes>
          <div className="col-lg-5 col-md-6">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h6>Solicitudes por Trámites</h6>
              </div>
              <div className="card-body p-3">
                {TotalPorTramite.length>0 &&(
                  <SolicitudesPorTramite totalesPorTramite={TotalPorTramite}/>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="footer pt-3  ">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6 mb-lg-0 mb-4">
                <div className="copyright text-center text-sm text-muted text-lg-start">
                  © {new Date().getFullYear() }
                  Hecho con <i className="fa fa-heart text-danger"></i> por <span style={{fontWeight: "bold"}}>TIC's</span>
                 <a href="https://www.transporte.gob.hn/" className="font-weight-bold" target="_blank" rel="noreferrer"> Instituto Hondureño del Transporte Terrestre.
                 </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
}

export default Dashboard
