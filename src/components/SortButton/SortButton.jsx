import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SortIcon from "../SortIcon/SortIcon.jsx";



function SortButton({columnKey, parentKey, config, setConfig}) {
    function handleClick() {
        if (columnKey === config.key && parentKey === config.parentKey) {
            if (config.direction === "asc") {
                setConfig({...config, direction: "desc"})
            } else {
                setConfig({...config, direction: "asc"})
            }
        } else {
            setConfig({key: columnKey, parentKey: parentKey, direction: "asc"})
        }
    }
    return (
        <button onClick={handleClick}>
            <SortIcon
                direction={
                columnKey === config.key && parentKey === config.parentKey
                    ? config.direction
                    : null
                }
            />
        </button>
    )
}

export default SortButton