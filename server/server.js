const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose").default;
const app = express();
const TodoTask = require("./models/TodoTask");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
mongoose.connect(process.env.DB_CONNECT);

app.get("/get", async (req, res) => {
	try {
		const items = await TodoTask.find({});
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.post("/create", async (req, res) => {
	const todoTask = new TodoTask({
		name: req.body.name,
		complete: req.body.complete,
	});
	try {
		await todoTask.save();
		res.status(200).json(todoTask);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.delete("/delete/:id", async (req, res) => {
	try {
		const item = await TodoTask.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Todo was delete" });
	} catch (err) {
		res.status(500).json(err);
	}
});

app.put("/complete/:id", async (req, res) => {
	try {
		const item = await TodoTask.findByIdAndUpdate(req.params.id, {
			$set: { complete: true },
		});
		res.status(200).json({ message: "Todo was complete" });
	} catch (err) {
		res.status(500).json(err);
	}
});

app.put("/unset/:id", async (req, res) => {
	try {
		const item = await TodoTask.findByIdAndUpdate(req.params.id, {
			$set: { complete: false },
		});
		res.status(200).json({ message: "Todo was unset" });
	} catch (err) {
		res.status(500).json(err);
	}
});

app.listen(5000, () => {
	console.log("listening on 5000");
});
