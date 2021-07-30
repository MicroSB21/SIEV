import React, {useEffect} from 'react'


const Tabla = ({parametrosTabla, datos}) => {
    let datosRegional = datos.find(t=> t.regional ===parametrosTabla.regional);
    if (datosRegional !== undefined) {
        datosRegional.data.sort((a,b) => Number(b.total) - Number(a.total))
    }
    useEffect(() => {
        console.log(parametrosTabla, datos);
       
    }, [parametrosTabla,datos])
   

    return (
        <div className="table-responsive">
            <table className="table align-items-center mb-0">
                <thead>
                    <tr>
                        {
                            parametrosTabla.encabezado.map((encabezado,index)=> (
                                <th key={index} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-8 text-center">
                                    {encabezado}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        datosRegional === undefined ? (
                            <tr className="bg-gradient-warning">
                                <td colSpan={3} className="text-white text-center">SIN SOLICITUDES RECIBIDAS AÚN :(</td>
                            </tr>
                        )
                        : ( datosRegional.data.map((usuario)=>(
                            <tr key={usuario.usuario}>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <img src="../assets/img/small-logos/user.svg" className="avatar avatar-sm me-3"
                                            alt="xd" />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">{usuario.usuario}</h6>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle text-center text-sm">
                                <span className="text-xs font-weight-bold"> {usuario.total}</span>
                            </td>
                            <td className="align-middle text-center">
                                <div className="progress-wrapper w-75 mx-auto">
                                    <div className="progress-info">
                                        <div className="progress-percentage">
                                            <span className="text-xs font-weight-bold">
                                                {
                                                    `${(Math.round((usuario.total/datosRegional.totalRegional) * 100 ))}%`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="progress" style={{width: "100%"}}>
                                        <div 
                                            className={`progress-bar bg-gradient-info w-${Math.round(Math.round((usuario.total/datosRegional.totalRegional) * 100 )/5)*5}`} role="progressbar"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        )))
                    }

                   
                </tbody>
            </table>
        </div>
    )
}

export default Tabla
