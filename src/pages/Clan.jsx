import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import { getClanInfo, getClanSummaryInfo, getClanWarInfo } from "../api/main.js";
import ClanBanner from "../components/ClanBanner/ClanBanner.jsx";

import styles from "./Clan.module.css"

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
                const basicInfo = await getClanInfo(tag)
                const summaryData = await getClanSummaryInfo(tag)
                const warData = await getClanWarInfo(tag)
                setClanData({ ...clanData, clan: {...basicInfo, playerCount: summaryData.length}, summary: summaryData, war: warData });
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
        <div className={styles.clan}>
            <ClanBanner info={clanData.clan}/>
            <Link to=".">Summary</Link>
            <Link to="wars">Wars</Link>
            <div className={styles["table-wrapper"]}>
                <Outlet context={{clanData}}/>
            </div>
        </div>
    )
}

export default Clan