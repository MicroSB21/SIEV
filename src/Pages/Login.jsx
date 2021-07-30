import React,{useContext,useState,useEffect} from 'react'
import userContext from '../context/UserContext'

import{withRouter} from 'react-router-dom'

const Login = (props) => {
  const {IniciarSesion,inicioSesion,loading} = useContext(userContext);

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const ingresar = () =>{
    IniciarSesion(usuario,password);
  }

  useEffect(()=>{
    if (inicioSesion) {
      props.history.push('/')
    }
  },[inicioSesion,props])


    return (
        <>
        <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid">
                <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="#!">
                  Sistema Estadisticas de Ventanilla
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Bienvenido</h3>
                      <p className="mb-0">Ingresa su Usuario de SATT y contraseña</p>
                    </div>
                    <div className="card-body">
                      <form>
                        <label>Usuario</label>
                        <div className="mb-3">
                          <input 
                            onChange={e => setUsuario(e.target.value)}
                            type="email" 
                            className="form-control" 
                            placeholder="Usuario" 
                            aria-label="Email" 
                            aria-describedby="email-addon"
                          />
                        </div>
                        <label>Contraseña</label>
                        <div className="mb-3">
                          <input 
                          onChange={e => setPassword(e.target.value)}
                          type="password" className="form-control" placeholder="Contraseña" aria-label="Password" aria-describedby="password-addon"/>
                        </div>
                        <div className="text-center">
                          <button type="button" className="btn bg-gradient-info w-100 mt-4 mb-0" disabled={loading} onClick={ingresar} >Iniciar Sesión</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{backgroundImage: "url('../assets/img/curved-images/curved6.jpg')"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer py-5">
          <div className="row">
              
            <div className="col-8 mx-auto text-center mt-1">
            <div className="copyright text-center text-sm text-muted text-lg-start">
                  © {new Date().getFullYear() }
                  Hecho con <i className="fa fa-heart text-danger"></i> por <span style={{fontWeight: "bold"}}>TIC's</span>
                 <a href="https://www.transporte.gob.hn/" className="font-weight-bold" target="_blank" rel="noreferrer"> Instituto Hondureño del Transporte Terrestre.
                 </a>
                </div>
            </div>
          </div>
      </footer>
      </>
    )
}

export default withRouter(Login)
