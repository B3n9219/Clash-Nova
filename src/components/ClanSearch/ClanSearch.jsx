import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { removeHashFromTag } from "../../utilities/formatting.js";


function ClanSearch() {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/clans/${removeHashFromTag(searchValue)}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button type="submit">Search</button>
        </form>
    )
}

export default ClanSearch