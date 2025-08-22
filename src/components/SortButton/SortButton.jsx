import {useState} from "react";

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
            {columnKey===config.key && parentKey === config.parentKey? <p>{config.direction}</p> : <p>None</p>}
        </button>
    )
}

export default SortButton