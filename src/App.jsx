import { Outlet } from "react-router-dom";

import styles from './App.module.css'


function App() {
  return (
    <div className={styles.app}>
        <p>APP</p>
        <Outlet />
    </div>
  )
}

export default App
