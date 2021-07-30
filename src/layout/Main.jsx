import React from 'react'
import Dashboard from '../components/dashboard'
import Navbar from '../components/Navbar'


const Main = () => {
    return (
        <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
            <Navbar></Navbar>
            <Dashboard></Dashboard>
        </main>
    )
}

export default Main
