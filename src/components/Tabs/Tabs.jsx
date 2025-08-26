import styles from "./Tabs.module.css"
import {NavLink} from "react-router-dom";


function Tabs({tabs}) {
    return (
        <div className={styles.tabs}>
            {tabs.map(tab => (
                <NavLink key={tab.to} to={tab.to} end={tab.to === "."} className={({ isActive }) =>
                    isActive ? `${styles.tab} ${styles.active}` : styles.tab
                }>
                    {tab.label}
                </NavLink>
            ))}
        </div>
    )
}

export default Tabs