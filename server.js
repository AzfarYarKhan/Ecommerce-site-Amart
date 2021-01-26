require("dotenv").config();
const express = require("express");
var expressLayout = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
// Database connection
const session = require("express-session");
const flash = require("express-flash");

const MongoDbstore = require("connect-mongo")(session);

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
//session store
let mongoStore = new MongoDbstore({
	mongooseConnection: connection,
	collection: "sessions",
});

//session config
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		store: mongoStore,
		saveUninitialized: false,
		cookie: { maxage: 1000 * 60 * 60 * 24 },
	})
);
const ejs = require("ejs");
const path = require("path");
app.use(flash());
app.use(express.static("public"));
app.use(express.json());
//global middleware
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web.js")(app);

app.listen(PORT, () => {
	console.log(`app listening at port ${PORT}`);
});
