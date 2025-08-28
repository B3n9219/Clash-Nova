import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import sortStyles from "./SortIcon.module.css"
import styles from "../icons.module.css"

function SortIcon({direction}) {
    let down_active = false, up_active = false
    if (direction === 'asc') {
        up_active = true
    } else if (direction === 'desc') {
        down_active = true
    }
    return (
        <div className={sortStyles.icon}>
            <FontAwesomeIcon icon="sort-up" className={up_active? `${styles.icon} ${styles.active}` : styles.icon}/>
            <FontAwesomeIcon icon="sort-down" className={down_active? `${styles.icon} ${styles.active}` : styles.icon}/>
        </div>
    );
}

export default SortIcon