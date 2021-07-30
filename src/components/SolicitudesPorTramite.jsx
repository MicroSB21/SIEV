import React, {useEffect, useState} from 'react'

import {Pie} from 'react-chartjs-2'

const SolicitudesPorTramite = ({totalesPorTramite}) => {
    const [chartData,setCharData] = useState({})
  
      useEffect(()=>{
        const dataChartSolicitudesPorTramite = () =>{
          let tramites = totalesPorTramite.map(a => a.Tramite);
          const coloresGrafico = [];
          for (let index = 0; index < tramites.length; index++) {
            let r = Math.floor(Math.random() * 256); // randomly generate 256 or less r values
            let g = Math.floor(Math.random() * 256); // randomly generate g values ​​within 256
            let b = Math.floor(Math.random() * 256); // randomly generate b values ​​within 256
            coloresGrafico[index] = `rgba(${r},${g},${b},0.5)`
            
          }
          let valores = totalesPorTramite.map(a => a.total);
          setCharData({
            labels: tramites,
            datasets:[
              {
                label: "",
                data:valores,
                backgroundColor:coloresGrafico,
              borderColor:coloresGrafico ,
  
              }
            ]
          })
        }
        dataChartSolicitudesPorTramite()
      },[totalesPorTramite])
    return (
        <div>
            <Pie 
                data={chartData} 
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                          display: true,
                          position:"bottom"
                        }
                      },
                      
                }}
                height={350}
                width={400} 
            />
        </div>
    )
}

export default SolicitudesPorTramite
