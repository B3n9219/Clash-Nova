import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Home() {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    function goToClan(tag) {
        navigate(`/clans/${tag}`)
    }
    return (
        <>
            <h2>Welcome to the Clash Nova home page!</h2>
            <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={() => goToClan(searchValue)}>Search</button>
        </>
    )
}

export default Home