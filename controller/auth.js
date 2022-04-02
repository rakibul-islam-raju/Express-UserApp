const { registerService } = require("../service/auth");

const registerController = async (req, res, next) => {
	console.log(req.body);

	const { name, email, password } = req.body;

	// vallidation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Invalid Data" });
	}

	try {
		const user = await registerService({ name, email, password });
		const data = {
			name: user.name,
			email: user.email,
			_id: user._id,
		};
		return res
			.status(201)
			.json({ message: "User Created Successfully", data });
	} catch (e) {
		next(e);
	}
};

const loginController = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const token = await loginService({ email, password });
		return res.status(200).json({ message: "Login Successful", token });
	} catch (e) {
		next(e);
	}
};

module.exports = {
	loginController,
	registerController,
};
