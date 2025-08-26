// Using this url for testing - use VM when in production
const baseRequest = "http://127.0.0.1:8000"
//const baseRequest = "/api"

async function getInfo(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }
    return response.json()
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

export { getClanSummaryInfo, getClanWarInfo }