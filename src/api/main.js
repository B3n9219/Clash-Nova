let baseRequest
if (import.meta.env.MODE === "production") {
    console.log("Running in production");
    baseRequest = "/api"
} else {
    baseRequest = "http://127.0.0.1:8000"
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


// console.log(await getClanWarInfo('#28P220JCV'))

export { getClanInfo, getClanSummaryInfo, getClanWarInfo }