import './App.css';
import Home from "./layout/Home"
import Reportes from '../src/Pages/Reportes'
import ReportePersonal from '../src/Pages/ReportePersonal';
import Login from '../src/Pages/Login'
import SideNav from '../src/layout/sidenav'

import SIEVState from './context/SievState';
import UserState from './context/UserState'

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"

function App() {
  const RutaPrivada = ({component, path, ...rest}) => {
    if (localStorage.getItem('usuario')) {
        return <Route component={component} path={path} {...rest}/>
    }else{
        return <Redirect to="/Login" {...rest}/>
    }
  }
  
  return (
    <UserState>
      <SIEVState>
        <Router>
          <Switch>
            <>
            <div className="g-sidenav-show bg-gray-100">
              <SideNav></SideNav>
              <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
                <RutaPrivada component={Reportes} path="/Reportes" exact/>
                <RutaPrivada component={ReportePersonal} path="/Reporte" exact/>
                <Route exact path='/Login' component={Login} />
                <Route exact path="/" component={Home}  /> 
              </main>
            </div>
            </>
          </Switch>
        </Router>
      </SIEVState>
    </UserState>
  );
}

export default App;
