import React from 'react'

const ContadorCard = ({porcentaje, encabezado, total, icono, AumentoProduccion }) => {
    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">{encabezado}</p>
                      <h5 className="font-weight-bolder mb-0">
                        {total}
                        <span className={`${AumentoProduccion? 'text-success': 'text-danger'} text-sm font-weight-bolder"`}>
                          {
                            AumentoProduccion ? (`+${Math.abs(porcentaje)}%`):(`-${Math.abs(porcentaje)}%`)
                          }
                          
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i className={`${icono} text-lg opacity-10`} aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default ContadorCard
