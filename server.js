const express = require("express");
var expressLayout = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
// Database connection

const url = "mongodb://localhost/bakery";

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});
const connection = mongoose.connection;
connection
	.once("open", () => {
		console.log("database connected ... ");
	})
	.catch((err) => {
		console.log("Connection failed ... ");
	});
const ejs = require("ejs");
const path = require("path");

app.use(express.static("public"));
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web.js")(app);

app.listen(PORT, () => {
	console.log(`app listening at port ${PORT}`);
});
