const bcrypt = require("bcryptjs");

async function encrypt(password) {
    return await bcrypt.hash(password, 10);
}

async function compare(password, encrypted) {
    return await bcrypt.compare(password, encrypted);
}

module.exports = {
    encrypt,
    compare,
};
