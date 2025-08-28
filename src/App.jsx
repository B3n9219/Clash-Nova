import { Outlet } from "react-router-dom";

import styles from './App.module.css'

import logo from "./assets/logo-nobg.png";


function App() {
    if (import.meta.env.MODE === "production") {
        console.log("Running in production");
    } else {
        console.log("Running in development");
    }
    return (
        <div className={styles.app}>
            <nav>
                <img src={logo} alt="Clash Nova Logo"/>
                <h2>Clash Nova</h2>
            </nav>
            <div className={styles.main}>
                <Outlet />
            </div>
        </div>
)
}

export default App
