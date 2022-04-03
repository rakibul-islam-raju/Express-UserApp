const User = require("../models/User");
const userService = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
	/**
	 * TODO: filter, sort, pagination, select
	 */
	try {
		const data = await userService.findUsers();
		return res.status(200).json(data);
	} catch (e) {
		next(e);
	}
};

const getUserByID = async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await userService.findUserByProperty("_id", userId);

		if (!user) throw error("User not found!", 404);

		delete user._doc.password;

		return res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};

const postUser = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const user = await authService.registerService({
			name,
			email,
			password,
		});

		delete user._doc.password;

		return res.status(201).json(user);
	} catch (e) {
		next(e);
	}
};

const putUserById = async (req, res, next) => {
	const { userId } = req.params;
	const { name, email } = req.body;

	try {
		const user = await userService.updateUser(userId, {
			name,
			email,
		});

		if (!user) throw error("User not found", 404);

		delete user._doc.password;

		return res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};

const patchUserById = async (req, res, next) => {
	const { userId } = req.params;
	const { name } = req.body;

	try {
		const user = await userService.findUserByProperty("_id", userId);

		if (!user) {
			throw error("User not found", 404);
		}

		user.name = name ?? user.name;
		await user.save();
		delete user._doc.password;

		return res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};

const deleteUserById = async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await userService.findUserByProperty("_id", userId);

		if (!user) {
			throw error("User not found", 404);
		}

		await user.remove();
		return res.status(203).send();
	} catch (e) {
		next(e);
	}
};

module.exports = {
	getUsers,
	getUserByID,
	postUser,
	putUserById,
	patchUserById,
	deleteUserById,
};
