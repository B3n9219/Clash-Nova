import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function FilterButton({ handleClick }) {
    return (
        <>
            <button onClick={handleClick}><FontAwesomeIcon icon="fa-solid fa-filter" /></button>
        </>
    )
}

export default FilterButton