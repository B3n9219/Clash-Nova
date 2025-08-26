import styles from "./ClanBanner.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ClanBanner({ info }) {
    return (
        info && (
            <section className={styles.banner}>
                <img src={info.badge} alt={"clan badge"}/>
                <div className={styles.info}>
                    <div className={styles.title}>
                        <h2>{info.name}</h2>
                        <div className={styles.players}>
                            <FontAwesomeIcon icon="fa-solid fa-users"/>
                            <p>{info.playerCount}</p>
                        </div>
                    </div>
                    <p>Description: {info.description}</p>
                </div>
            </section>
        )
    )
}

export default ClanBanner