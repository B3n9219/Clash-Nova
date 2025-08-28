import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../icons.module.css"

function FilterButton({ active, handleClick }) {
    return (
        <>
            <button className={"table-button"} onClick={handleClick}>
                <FontAwesomeIcon icon="fa-solid fa-filter" className={active ? `${styles.icon} ${styles.active}` : styles.icon}/>
            </button>
        </>
    )
}

export default FilterButton