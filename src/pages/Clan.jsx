import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import { getClanInfo, getClanSummaryInfo, getClanWarInfo, getClanRaidInfo } from "../api/main.js";
import ClanBanner from "../components/ClanBanner/ClanBanner.jsx";

import styles from "./Clan.module.css"

import { Outlet } from "react-router-dom";

import Tabs from "../components/Tabs/Tabs.jsx";


function Clan() {
    const { tag } = useParams();
    const [clanData, setClanData] = useState({
        clan: null,
        summary: null,
        wars: null,
        raid: null,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        async function loadBanner() {
            try {
                const info = await getClanInfo(tag)
                setClanData({...clanData, clan: info})
            } catch {
                // Clan not in database

            }
        }
        async function fetchClanData() {
            try {
                const [basicInfo, summaryData, warData, raidData] = await Promise.all([
                    getClanInfo(tag),
                    getClanSummaryInfo(tag),
                    getClanWarInfo(tag),
                    getClanRaidInfo(tag)
                ]);
                setClanData({ ...clanData, clan: {...basicInfo, playerCount: summaryData.length},
                    summary: summaryData, wars: warData, raids: raidData});
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
            <Tabs tabs={[
                {to: ".", label: "Summary"},
                {to: "wars", label: "Wars"},
                {to: "raids", label: "Raids"},
            ]}>
            </Tabs>
            <div className={styles["table-scroll"]}>
                <div className={styles["table-mask"]}></div>
                <Outlet context={{clanData}}/>
            </div>
        </div>
    )
}

export default Clan