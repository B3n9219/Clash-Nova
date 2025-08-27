import ClanSearch from "../components/ClanSearch/ClanSearch.jsx";
import styles from "./Home.module.css"

function Home() {
    return (
        <div className={styles.home}>
            <ClanSearch />
        </div>
    )
}

export default Home