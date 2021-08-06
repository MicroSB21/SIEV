import React from 'react'
import Navbar from '../components/Navbar'
import Dashboard from '../components/dashboard'

// import userContext from '../context/UserContext'


function Home() {



//    const {inicioSesion} = useContext(userContext);
    return (
        <>
            <Navbar></Navbar>
            <Dashboard/>
        </>
    )
}

export default Home
