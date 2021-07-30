import React,{useEffect, useState} from 'react'

import {Bar} from 'react-chartjs-2'

const TotalesGrafico = ({totales}) => {

    const [chartData,setCharData] = useState({})
    const totalRegionales = totales.reduce((n, {cantidad}) => n + cantidad, 0)
    let teguz = totales.find(c => c.Ciudad==="Tegucigalpa");
    let sps = totales.find(c=> c.Ciudad === "San Pedro Sula");
    let Ceiba = totales.find(c=> c.Ciudad ==="Ceiba");

    if (!teguz) {
      teguz={
        Ciudad : "Tegucigalpa",
        cantidad : 0,
        porcentaje: Math.ceil( Math.round((0/totalRegionales)*100)/5)*5
      }
    }else teguz.porcentaje = Math.ceil( Math.round((teguz.cantidad/totalRegionales)*100)/5)*5
    

    //${Math.ceil( Math.round((sps.cantidad/totalRegionales)*100)/5)*5}
        
    if (!sps) {
      sps={
        Ciudad : "San Pedro Sula",
        cantidad : 0
      }
    }else sps.porcentaje = Math.ceil( Math.round((sps.cantidad/totalRegionales)*100)/5)*5

    if (!Ceiba) {
      Ceiba={
        Ciudad : "Ceiba",
        cantidad : 0
      }
    }else Ceiba.porcentaje = Math.ceil( Math.round((Ceiba.cantidad/totalRegionales)*100)/5)*5
   
    let Choluteca = totales.find(c=> c.Ciudad ==="Choluteca");
    if (!Choluteca) {
      Choluteca={
        Ciudad : "Choluteca",
        cantidad : 0
      }
    }else Choluteca.porcentaje = Math.ceil( Math.round((Choluteca.cantidad/totalRegionales)*100)/5)*5

   



    useEffect(()=>{
      const dataChartRegionales = () =>{
        
        setCharData({
          labels:['Tegucigalpa', 'San Pedro Sula', 'Ceiba', 'Choluteca'],
          datasets:[
            {
              label: "",
              data:[
                teguz.cantidad, 
                sps.cantidad, 
                Ceiba.cantidad,
                Choluteca.cantidad ],
              backgroundColor: "#fff",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              maxBarThickness: 10
            }
          ]
        })
      }
      dataChartRegionales()
    },[totales])
    return (
        <div className="card z-index-2">
        <div className="card-body p-3">
          <div className="bg-gradient-dark border-radius-lg py-3 pe-1 mb-3">
            <div className="chart">
              <Bar 
                height={90}
                data={chartData}
                options={{
                  maintainAspectRatio: true,
                  responsive:true,
                  plugins: {
                    legend: {
                      display: false,
                    }
                  },
                  interaction: {
                    intersect: false,
                    mode: 'index',
                  },
                  scales: {
                    y: {
                      grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                      },
                      ticks: {
                        suggestedMin: 0,
                        suggestedMax: 500,
                        beginAtZero: true,
                        padding: 15,
                        font: {
                          size: 14,
                          family: "Open Sans",
                          style: 'normal',
                          lineHeight: 2
                        },
                        color: "#fff"
                      },
                    },
                    x: {
                      grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false
                      },
                      ticks: {
                        display: false
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <h6 className="ms-2 mt-4 mb-0"> Solicitudes por Regional </h6>
          <div className="container border-radius-lg">
            <div className="row">
              <div className="col-3 py-3 ps-0">
                <div className="d-flex mb-2">
                  <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-primary text-center me-2 d-flex align-items-center justify-content-center">
                    <svg width="10px" height="10px" viewBox="0 0 42 42" version="1.1"xmlns="http://www.w3.org/2000/svg" >
                        <title>office</title>
                        <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Rounded-Icons" transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF"
                               fillRule="nonzero">
                                <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                                    <g id="office" transform="translate(153.000000, 2.000000)">
                                        <path className="color-background"
                                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                            id="Path" opacity="0.6"></path>
                                        <path className="color-background"
                                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </div>
                  <p className="text-xs mt-1 mb-0 font-weight-bold">Tegucigalpa</p>
                </div>
                <h4 className="font-weight-bolder">{teguz.cantidad}</h4>
                <div className="progress w-75">
                  <div className={`progress-bar bg-dark w-${teguz.porcentaje}`} role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-3 py-3 ps-0">
                <div className="d-flex mb-2">
                  <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center">
                  <svg width="10px" height="10px" viewBox="0 0 42 42" version="1.1"xmlns="http://www.w3.org/2000/svg" >
                        <title>office</title>
                        <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Rounded-Icons" transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF"
                                fillRule="nonzero">
                                <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                                    <g id="office" transform="translate(153.000000, 2.000000)">
                                        <path className="color-background"
                                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                            id="Path" opacity="0.6"></path>
                                        <path className="color-background"
                                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </div>
                  <p className="text-xs mt-1 mb-0 font-weight-bold">San Pedro Sula</p>
                </div>
                <h4 className="font-weight-bolder">{sps.cantidad}</h4>
                <div className="progress w-75">
                  <div className={`progress-bar bg-dark  w-${sps.porcentaje}`} role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-3 py-3 ps-0">
                <div className="d-flex mb-2">
                  <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-warning text-center me-2 d-flex align-items-center justify-content-center">
                  <svg width="10px" height="10px" viewBox="0 0 42 42" version="1.1"xmlns="http://www.w3.org/2000/svg" >
                        <title>office</title>
                        <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Rounded-Icons" transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF"
                                fillRule="nonzero">
                                <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                                    <g id="office" transform="translate(153.000000, 2.000000)">
                                        <path className="color-background"
                                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                            id="Path" opacity="0.6"></path>
                                        <path className="color-background"
                                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </div>
                  <p className="text-xs mt-1 mb-0 font-weight-bold">Ceiba</p>
                </div>
                <h4 className="font-weight-bolder">{Ceiba.cantidad}</h4>
                <div className="progress w-75">
                  <div className={`progress-bar bg-dark  w-${Ceiba.porcentaje}`} role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
              <div className="col-3 py-3 ps-0">
                <div className="d-flex mb-2">
                  <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-danger text-center me-2 d-flex align-items-center justify-content-center">
                  <svg width="10px" height="10px" viewBox="0 0 42 42" version="1.1"xmlns="http://www.w3.org/2000/svg" >
                        <title>office</title>
                        <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Rounded-Icons" transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF"
                               fillRule="nonzero">
                                <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
                                    <g id="office" transform="translate(153.000000, 2.000000)">
                                        <path className="color-background"
                                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                                            id="Path" opacity="0.6"></path>
                                        <path className="color-background"
                                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                  </div>
                  <p className="text-xs mt-1 mb-0 font-weight-bold">Choluteca</p>
                </div>
                <h4 className="font-weight-bolder">{Choluteca.cantidad}</h4>
                <div className="progress w-75">
                  <div className={`progress-bar bg-dark  w-${Choluteca.porcentaje}`}role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TotalesGrafico
