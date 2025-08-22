// Using this url for testing - use VM when in production
const baseRequest = "http://127.0.0.1:8000"

async function getClanSummaryInfo(tag) {
    const encodedTag = encodeURIComponent(tag);
    const response = await fetch(`${baseRequest}/clan/${encodedTag}/players/summary`)
    if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
    }
    return response.json()
}


export { getClanSummaryInfo }