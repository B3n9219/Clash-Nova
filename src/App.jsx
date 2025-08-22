import { Outlet } from "react-router-dom";

import './App.module.css'


function App() {
  return (
    <div>
        <p>APP</p>
        <Outlet />
    </div>
  )
}

export default App
