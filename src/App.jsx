import {Link, Outlet} from "react-router-dom";

import styles from './App.module.css'

import logo from "./assets/logo-nobg.png";


function App() {
    return (
        <div className={styles.app}>
            <nav>
                <Link to={"/"}>
                    <img src={logo} alt="Clash Nova Logo"/>
                    <h2>Clash Nova</h2>
                </Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default App
