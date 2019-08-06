const { User, Item, Category } = require('./database/module');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// this part to signup the users and hash the password
exports.signup = (req, res) => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);
	User.create({
		email: req.body.email,
		password: hash,
		name: req.body.name,
		location: req.body.location,
		phonenumber: req.body.phonenumber,
		img: req.body.img,
		name: req.body.name
	}).then((data) => {
		res.send(data.dataValues);
	});
};
//this part to check from the email and the password and login and have token
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
			console.log(data);
			res.send({ data: data, token: token });
		} else {
			res.status(401).send({ err: 'your pass is wrong' });
		}
	});
};
