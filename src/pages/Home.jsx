import {BackgroundBeams} from "../components/NovaBackground/NovaBackground.jsx";
import ClanSearch from "../components/ClanSearch/ClanSearch.jsx";
import styles from "./Home.module.css"

function Home() {
    return (
        <div className={styles.home}>

            <div className={styles.spacer}></div>
            <div className={styles["search-wrapper"]}>
                <ClanSearch />
            </div>
            <BackgroundBeams className={styles.background}/>
        </div>
    )
}

export default Home