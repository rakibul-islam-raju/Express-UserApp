const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
	console.log(err);
	const message = err.message ? err.message : "Server Error Occurred";
	const status = err.status ? err.status : 500;

	res.status(status).json({
		message,
	});
});

connectDB("mongodb://localhost:27017/userApp")
	.then(() => {
		console.log("Database Connected");
		app.listen(8000, () => {
			console.log("I am listening on port 8000");
		});
	})
	.catch((e) => console.log(e));
