const { User, Item, Category } = require('./database/module');

exports.signup = (req, res) => {
	console.log(req.body, 'dfhdhhjh');
	User.create({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		location: req.body.location,
		phonenumber: req.body.phonenumber,
		img: req.body.img
	}).then((data) => {
		// console.log(data);
		res.send(data);
	});
};

exports.signin = (req, res) => {
	console.log(req.query);
	User.findOne({
		where: {
			email: req.query.email,
			password: req.query.password
		}
	}).then((data) => {
		// console.log(data)
		res.send(data);
	});
};
