import {useParams} from "react-router-dom";
import {useEffect, useState, useRef} from "react";

import { addClan, refreshClanData, getClanInfo, getClanSummaryInfo, getClanWarInfo, getClanRaidInfo } from "../api/main.js";
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
    const hasFetched = useRef(false);
    useEffect(() => {
        async function fetchAllData() {
            if (hasFetched.current) return; // prevent double fetch
            hasFetched.current = true;
            setLoading(true)
            setError(null)
            try {
                console.log("GETTING CLAN 1")
                let clan = await getClanInfo(tag)
                if (!clan) {
                    console.log("ADDING CLAN")
                    await addClan(tag)
                    console.log("REFRESHING CLAN")
                    await refreshClanData(tag)
                    console.log("GETTING CLAN 2")
                    clan = await getClanInfo(tag)
                }

                const [summary, wars, raids] = await Promise.all([
                    getClanSummaryInfo(tag),
                    getClanWarInfo(tag),
                    getClanRaidInfo(tag)
                ])

                setClanData({
                    clan: { ...clan, playerCount: summary.length },
                    summary,
                    wars,
                    raids
                })
            } catch (err) {
                setError(err.message || "Clan doesn't exist")
                setClanData({ clan: null, summary: null, wars: null, raids: null })
            } finally {
                setLoading(false)
            }
        }
        fetchAllData()
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