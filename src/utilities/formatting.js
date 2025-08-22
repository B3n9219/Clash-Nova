function removeHashFromTag(tag) {
    if (typeof tag !== 'string') return tag;
    return tag.startsWith('#') ? tag.slice(1) : tag;
}

export { removeHashFromTag }