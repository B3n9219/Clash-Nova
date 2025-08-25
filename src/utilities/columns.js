function generateColumnId(key, parentKey) {
    return parentKey ? `${parentKey}-${key}` : key;
}

function addIds(columns) {
    return columns.map(group => ({
        ...group,
        children: group.children.map(col => ({
            ...col,
            id: generateColumnId(col.key, col.parentKey)
        }))
    }));
}

export { addIds }