let baseRequest
if (import.meta.env.MODE === "production") {
    console.log("Running in production");
    baseRequest = "/api"
} else {
    baseRequest = "http://127.0.0.1:8000"
}

async function addClan(tag) {
    const encodedTag = encodeURIComponent(tag);
    try {
        const response = await fetch(`${baseRequest}/clan/${encodedTag}`, { method: "POST" });
        if (!response.ok) {
            throw new Error(`Failed to add clan: ${response.status}`);
        }
        return await response.json(); // if your API returns JSON
    } catch (e) {
        throw e
    }
}


async function refreshClanData(tag) {
    const encodedTag = encodeURIComponent(tag);
    try {
        await fetch(`${baseRequest}/clan/${encodedTag}/refresh`, {method: "POST"})
    } catch (e) {
        throw new Error(e)
    }
}


async function getInfo(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }
    return response.json()
}


async function getClanInfo(tag) {
    const encodedTag = encodeURIComponent(tag);
    return await getInfo(`${baseRequest}/clan/${encodedTag}/info`)
}


async function getClanSummaryInfo(tag) {
    const encodedTag = encodeURIComponent(tag);
    return await getInfo(`${baseRequest}/clan/${encodedTag}/players/summary`)
}


async function getClanWarInfo(tag) {
    const encodedTag = encodeURIComponent(tag);
    return await getInfo(`${baseRequest}/clan/${encodedTag}/players/war`)
}


async function getClanRaidInfo(tag) {
    const encodedTag = encodeURIComponent(tag);
    return await getInfo(`${baseRequest}/clan/${encodedTag}/players/raids`)
}


// console.log(await getClanWarInfo('#28P220JCV'))

export { addClan, refreshClanData, getClanInfo, getClanSummaryInfo, getClanWarInfo, getClanRaidInfo }