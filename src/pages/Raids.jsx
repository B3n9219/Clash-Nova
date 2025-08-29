import Table from "../components/Table/Table.jsx";
import getRaidColumns from "../columns/raidsTable.js";
import { getUniqueDates } from "../utilities/filtering.js";

import { useOutletContext } from "react-router-dom";


function Wars() {
    const { clanData } = useOutletContext()
    return (
        <Table data={clanData.raids} columns={getRaidColumns(getUniqueDates(clanData.raids))}/>
    )
}

export default Wars