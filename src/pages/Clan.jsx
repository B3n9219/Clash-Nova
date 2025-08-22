import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

import { getClanSummaryInfo } from "../api/main.js";

function Clan() {
    const { tag } = useParams();
    const [clanData, setClanData] = useState({
        summary: null,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchClanData() {
            try {
                const summaryData = await getClanSummaryInfo(tag)
                setClanData({...clanData, summary: summaryData})
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
            <p>{clanData}</p>
        </>
    )
}

export default Clan