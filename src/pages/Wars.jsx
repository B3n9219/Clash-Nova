import Table from "../components/Table/Table.jsx";
import getWarColumns from "../columns/warTable.js";
import { getUniqueDates } from "../utilities/filtering.js";

import { useOutletContext } from "react-router-dom";


function Wars() {
    const { clanData } = useOutletContext()
    return (
        <Table data={clanData.war} columns={getWarColumns(getUniqueDates(clanData.war))}/>
    )
}

export default Wars