const Menu = require("../../models/menu");

function homecontroller() {
	return {
		async index(req, res) {
			const allitems = await Menu.find();
			console.log(allitems);
			return res.render("home", { allitems: allitems });
		},
	};
}

module.exports = homecontroller;
