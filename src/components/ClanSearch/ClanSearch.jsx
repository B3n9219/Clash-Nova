import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { removeHashFromTag, removeOs } from "../../utilities/formatting.js";

import styles from "./ClanSearch.module.css"

function ClanSearch() {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        let formatted = removeHashFromTag(searchValue)
        formatted = removeOs(formatted.toUpperCase())
        navigate(`/clans/${formatted}`)
    }
    return (
        <form onSubmit={handleSubmit} className={styles["search-bar"]}>
            <input type="search" placeholder="Search for a clan tag..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button type="submit">Go</button>
        </form>
    )
}

export default ClanSearch