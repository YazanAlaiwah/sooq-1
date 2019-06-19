const { User, Item, Category } = require('./database/module');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	console.log('fdsjk');
	var hashPassword;
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);
	console.log('hy');
	User.create({
		email: req.body.email,
		password: hash,
		name: req.body.name,
		location: req.body.location,
		phonenumber: req.body.phonenumber,
		img: req.body.img,
		name: req.body.name
	}).then((data) => {
		// console.log(data);
		res.send(data.dataValues);
	});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			email: req.query.email
		}
	}).then((data) => {
		if (!data) {
			return res.status(401).send('please signup');
		}
		if (bcrypt.compareSync(req.query.password, data.dataValues.password)) {
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
			res.status(401).send({ err: 'your pass is wrong' });
		}
	});
};
