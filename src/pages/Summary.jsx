import summaryColumns from "../columns/summaryTable.js"

import Table from "../components/Table/Table.jsx";

import { useOutletContext } from "react-router-dom";

function Summary() {
    const { clanData } = useOutletContext()
    return (
        <Table data={clanData.summary} columns={summaryColumns}/>
    )
}

export default Summary