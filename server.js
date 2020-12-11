const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/resources/views"));

app.get("/", (req, res) => {
	res.render("home");
});

app.listen(PORT, () => {
	console.log(`app listening at port ${PORT}`);
});
