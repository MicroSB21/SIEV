import React, {useContext} from 'react'
import { useLocation, withRouter } from 'react-router-dom';
import userContext from '../context/UserContext';

const Navbar = (props) => {
    const pagina = useLocation().pathname.substring(1);
    const {infoUsuario,inicioSesion, CerrarSesion} = useContext(userContext);

    const cerrarSesionUsuario = ()=> {
        CerrarSesion()
        props.history.push('/login');
    }

    const loguearse = (e) => {
        e.preventDefault();
        props.history.push('/Login');
    }

    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
            navbar-scroll="true">
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="!#">Pagina</a>
                        </li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Inicio</li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">{pagina}</h6>
                </nav>
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <div className="input-group">
                            <span className="input-group-text text-body">
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </span>
                            <input type="text" className="form-control" placeholder="Buscar..." />
                        </div>
                    </div>
                    <ul className="navbar-nav  justify-content-end">
                        <li className="nav-item d-flex align-items-center">
                            {inicioSesion? (
                                <div className="author align-items-center">
                                <img src={infoUsuario.imagen.img} alt="..." className="avatar shadow" />
                                <div className="name ps-3">
                                    <span>{infoUsuario.perfil.Nombre}</span>
                                    <div className="stats">
                                        <i className="fas fa-sign-out-alt"></i>
                                        <small style={{cursor: 'pointer'}} onClick={() => cerrarSesionUsuario()}>Cerrar Sesión</small>
                                    </div>
                                </div>
                            </div>
                            ) : (
                                <a href="#!" onClick={loguearse} className="nav-link text-body font-weight-bold px-0">
                                    <i className="fa fa-user me-sm-1"></i>
                                    <span className="d-sm-inline d-none">Iniciar Sesión</span>
                                </a>

                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        )
}

export default withRouter(Navbar)
