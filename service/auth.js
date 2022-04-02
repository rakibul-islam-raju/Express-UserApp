const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utils/error");

const registerService = async ({ name, email, password }) => {
	console.log("fired =>>", name, email, password);
	let user = await findUserByProperty("email", email);
	if (user) throw error("User already exist", 400);

	console.log("fired =>> here =>>", password);
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	console.log("hash ==>", hash);

	return createNewUser({ name, email, password: hash });
};

module.exports = { registerService };
