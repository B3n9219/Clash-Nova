import { Outlet } from "react-router-dom";

import styles from './App.module.css'

import logo from "./assets/logo-nobg.png";


function App() {
    return (
        <div className={styles.app}>
            <nav>
                <img src={logo} alt="Clash Nova Logo"/>
                <h2>Clash Nova</h2>
            </nav>
            <Outlet />
        </div>
)
}

export default App
