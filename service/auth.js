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

const loginService = async ({ email, password }) => {
	const user = await findUserByProperty("email", email);
	if (!user) throw error("Invalid Credential", 400);

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw error("Invalid Credential", 400);

	const payload = {
		_id: user._id,
		name: user.name,
		email: user.email,
	};
	return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = { registerService, loginService };
