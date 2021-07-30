import React,{useEffect, useState} from 'react'

import {Pie} from 'react-chartjs-2'

const GraficoSolicitudesPorCategoria = ({solicitudesPorCategoria}) => {

    const [chartData,setCharData] = useState({})


      useEffect(()=>{
        const dataChartSolicitudesPorCategoria = () =>{
          let categorias = solicitudesPorCategoria.map(a => a.Categoria);
          let valores = solicitudesPorCategoria.map(a => a.total);
          const coloresGrafico = [];
          for (let index = 0; index < categorias.length; index++) {
            let r = Math.floor(Math.random() * 256); // randomly generate 256 or less r values
            let g = Math.floor(Math.random() * 256); // randomly generate g values ​​within 256
            let b = Math.floor(Math.random() * 256); // randomly generate b values ​​within 256
            coloresGrafico[index] = `rgba(${r},${g},${b},0.5)`
            
          }
          setCharData({
            labels: categorias,
            datasets:[
              {
                label: "",
                data:valores,
                backgroundColor: coloresGrafico,
                borderColor: coloresGrafico
              }
            ]
          })
        }
        dataChartSolicitudesPorCategoria()
      },[solicitudesPorCategoria])
    return (
        <div className="card z-index-2">
            <div className="card-header pb-0">
                <h6>Solicitudes por categoría</h6>
            </div>
            <div className="card-body p-3">
                <div >
                    <Pie  
                        data={chartData} 
                        options={{
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                            legend: {
                              display: true,
                              position:"left"
                            }
                          }
                        }}
                        height={350}
                        width={400}
                    />
                </div>
            </div>
        </div>
       
    )
}

export default GraficoSolicitudesPorCategoria
