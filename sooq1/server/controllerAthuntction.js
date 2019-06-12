const { User, Item, Category } = require('./database/module');
const jwt = require('jsonwebtoken');

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
		res.send(data.dataValues);
	});
};

exports.signin = (req, res) => {
	// res.setHeader("'Content-Type', 'application/json'");
	console.log(req.query);
	User.findOne({
		where: {
			email: req.query.email,
			password: req.query.password
		}
	}).then((data) => {
		if (data) {
			var token = jwt.sign(
				{
					data: data.dataValues.id
				},
				'secret',
				{ expiresIn: '1h' }
			);
			// res.write(data.statusCode);
			// res.end();
			console.log(data);
			res.send({ data: data, token: token });
		} else {
			res.send({ err: "you'r input not corect" });
		}
	});
};
