import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

import {getClanSummaryInfo, getClanWarInfo} from "../api/main.js";
import { getUniqueDates } from "../utilities/filtering.js";

import Table from "../components/SummaryTable/Table.jsx";

import summaryColumns from "../columns/summaryTable.js"
import getWarColumns from "../columns/warTable.js"




function Clan() {
    const { tag } = useParams();
    const [clanData, setClanData] = useState({
        summary: null,
        war: null
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchClanData() {
            try {
                const summaryData = await getClanSummaryInfo(tag)
                const warData = await getClanWarInfo(tag)
                setClanData({...clanData, summary: summaryData, war: warData})
                setError(null)
            } catch (error) {
                setError(error.message)
                setClanData(null)
            } finally {
                setLoading(false)
            }
        }
        fetchClanData()
    }, [])
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return (
        <>
            <p>Clan tag: {tag}</p>
            <Table data={clanData.summary} columns={summaryColumns}/>
            <Table data={clanData.war} columns={getWarColumns(getUniqueDates(clanData.war))}/>
        </>
    )
}

export default Clan