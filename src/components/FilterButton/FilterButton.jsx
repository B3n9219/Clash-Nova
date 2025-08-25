import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./FilterButton.module.css"

function FilterButton({ active, handleClick }) {
    return (
        <>
            <button className={"table-button"} onClick={handleClick}><FontAwesomeIcon icon="fa-solid fa-filter" className={active? styles.active: ""}/></button>
        </>
    )
}

export default FilterButton