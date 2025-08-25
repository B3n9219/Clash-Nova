import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from "./SortIcon.module.css"

function SortIcon({direction}) {
    let down_active = false, up_active = false
    if (direction === 'asc') {
        up_active = true
    } else if (direction === 'desc') {
        down_active = true
    }
    return (
        <div className={styles.icon}>
            <FontAwesomeIcon icon="sort-up" className={up_active? styles.active: ""}/>
            <FontAwesomeIcon icon="sort-down" className={down_active? styles.active: ""}/>
        </div>
    );
}

export default SortIcon