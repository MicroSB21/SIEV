import './App.css';
import Home from "./layout/Home"
import SIEVState from './context/SievState';
import UserState from './context/UserState'
function App() {
  
  return (
    <UserState>
      <SIEVState>
        <Home></Home>
      </SIEVState>
    </UserState>
  );
}

export default App;
