
exports.validatePayload = (body, keys) => {
    for (let key of keys) {
        if (!body[key]) return false;
    }
    return true;
}

