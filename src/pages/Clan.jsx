import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import { getClanSummaryInfo, getClanWarInfo } from "../api/main.js";

import { Outlet } from "react-router-dom";


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
            <Link to=".">Summary</Link>
            <Link to="wars">Wars</Link>
            <Outlet context={{clanData}}/>
        </>
    )
}

export default Clan