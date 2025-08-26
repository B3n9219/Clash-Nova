import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import { getClanBasicInfo, getClanSummaryInfo, getClanWarInfo } from "../api/main.js";
import ClanBanner from "../components/ClanBanner/ClanBanner.jsx";

import { Outlet } from "react-router-dom";


function Clan() {
    const { tag } = useParams();
    const [clanData, setClanData] = useState({
        clan: null,
        summary: null,
        war: null
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function fetchClanData() {
            try {
                const basicInfo = await getClanBasicInfo(tag)
                const summaryData = await getClanSummaryInfo(tag)
                const warData = await getClanWarInfo(tag)
                setClanData({ ...clanData, clan: basicInfo, summary: summaryData, war: warData });
                setError(null)
            } catch (error) {
                setError(error.message)
                setClanData(null)
            } finally {
                setLoading(false)
            }
        }
        fetchClanData()
    }, [tag])
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return (
        <div>
            <ClanBanner info={clanData.clan}/>
            <Link to=".">Summary</Link>
            <Link to="wars">Wars</Link>
            <Outlet context={{clanData}}/>
        </div>
    )
}

export default Clan