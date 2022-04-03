require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
	JWT_SECRET_KEY,
	MONGODB_URL,
};
