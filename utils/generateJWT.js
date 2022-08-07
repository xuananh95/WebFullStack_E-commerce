const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id }, "some_secret", {
        expiresIn: "1d",
    });
};

module.exports = generateToken;
