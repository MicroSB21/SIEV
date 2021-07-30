import React, {useContext} from 'react'
import SideNav from './sidenav'
import Navbar from '../components/Navbar'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Dashboard from '../components/dashboard'
import ReportePersonal from '../Pages/ReportePersonal';
import Reportes from '../Pages/Reportes'
import Login from '../Pages/Login'
import userContext from '../context/UserContext'


function Home() {
   const {inicioSesion} = useContext(userContext);
    return (
        <Router>
            <Switch>
                <>
                <div className="g-sidenav-show bg-gray-100">
                    {inicioSesion &&<SideNav></SideNav>}
                    <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                        <Navbar></Navbar>
                        <Route path="/Reporte">
                            <ReportePersonal/>
                        </Route>
                        <Route path="/Reportes">
                            <Reportes/>
                        </Route>
                        <Route path="/Login">
                            <Login></Login>
                        </Route>
                        <Route exact path="/">
                            <Dashboard></Dashboard>
                        </Route> 
                    </main>
                </div>
                </>
            </Switch>
        </Router>
    )
}

export default Home
