function removeHashFromTag(tag) {
    if (typeof tag !== 'string') return tag;
    return tag.startsWith('#') ? tag.slice(1) : tag;
}

function removeOs(tag) {
    let newTag = ""
    for (let letter of tag) {
        if (letter === "O" || letter === "o") {
            newTag += 0
        }
        else {
            newTag += letter
        }
    }
    return newTag
}

export { removeHashFromTag, removeOs }