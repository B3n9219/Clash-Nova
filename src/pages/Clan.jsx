import {useParams} from "react-router-dom";
import {useEffect, useState, useRef} from "react";

import { addClan, refreshClanData, getClanInfo, getClanSummaryInfo, getClanWarInfo, getClanRaidInfo } from "../api/main.js";
import ClanBanner from "../components/ClanBanner/ClanBanner.jsx";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";

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
    const [loadingMessage, setLoadingMessage] = useState(null)
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
                setLoadingMessage("Retrieving Clan")
                let clan = await getClanInfo(tag)
                if (!clan) {
                    console.log("ADDING CLAN")
                    setLoadingMessage("Adding new clan")
                    await addClan(tag)
                    setLoadingMessage("Fetching clan data")
                    console.log("REFRESHING CLAN")
                    await refreshClanData(tag)
                    console.log("GETTING CLAN 2")
                    clan = await getClanInfo(tag)
                }
                setClanData(prev => ({ ...prev, clan: clan }))
                setLoadingMessage("Fetching clan data")
                const [summary, wars, raids] = await Promise.all([
                    getClanSummaryInfo(tag),
                    getClanWarInfo(tag),
                    getClanRaidInfo(tag)
                ])
                setClanData(prev => ({
                    ...prev, clan: { ...clan, playerCount: summary.length }, summary, wars,  raids
                }))
            } catch (err) {
                setError(err.message || "Clan doesn't exist")
                setClanData({ clan: null, summary: null, wars: null, raids: null })
            } finally {
                setLoading(false)
            }
        }
        fetchAllData()
    }, [tag])

    if (error) return <p>{error}</p>
    return (
        <div className={styles.clan}>
            {clanData.clan &&
            <ClanBanner info={clanData.clan}/>
            }
            {loading && (
                <div className={styles.loading}>
                    <LoadingSpinner/>
                    <p>{loadingMessage ? `${loadingMessage}...` : "Loading..."}</p>
                </div>
            )}
            {!loading &&
                <>
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
            </>
            }
        </div>
    )
}

export default Clan