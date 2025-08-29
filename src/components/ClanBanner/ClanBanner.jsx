import styles from "./ClanBanner.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ClanBanner({ info }) {
    return (
        info && (
            <section className={styles.banner}>
                <div className={styles["badge-container"]}>
                    <img src={info.badge} alt={"clan badge"}/>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        <h2>{info.name}</h2>
                        <div className={styles.players}>
                            <FontAwesomeIcon icon="fa-solid fa-users"/>
                            <p>{info.playerCount? info.playerCount: "-"}</p>
                        </div>
                    </div>
                    <p>{info.description}</p>
                </div>
            </section>
        )
    )
}

export default ClanBanner