const express = require("express");
var expressLayout = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const path = require("path");

app.use(express.static("public"));
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/cart", (req, res) => {
	res.render("customers/cart");
});

app.get("/login", (req, res) => {
	res.render("auth/login");
});
app.get("/register", (req, res) => {
	res.render("auth/register");
});

app.listen(PORT, () => {
	console.log(`app listening at port ${PORT}`);
});
