function getUniqueDates(players) {
    if (!players) return [];

    const dateKeys = players.flatMap(player =>
        Object.keys(player).filter(key => key !== "name" && key !== "tag")
    );

    return [...new Set(dateKeys)];
}

export { getUniqueDates };