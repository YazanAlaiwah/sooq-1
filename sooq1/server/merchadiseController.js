const { User, Item, Category } = require('./database/module');

exports.addMerchandise = (req, res) => {
	// console.log(req.body);
	const { img, descrbtion, title, cost, userId } = req.body;
	console.log(req.body);
	Category.findOne({
		where: {
			type: req.body.type,
			specfic: req.body.specfic
		},
		attributes: [ 'id' ]
	}).then((idcc) => {
		console.log(idcc.dataValues);
		Item.create({
			img: img,
			descrbtion: descrbtion,
			title: title,
			cost: cost,
			userId: userId,
			categoryId: idcc.dataValues.id
		}).then((data) => {
			// console.log(data);
			res.send(data);
		});
	});
};

exports.removeMerchandise = (req, res) => {
	Item.destroy({
		where: {
			id: req.body.id
		}
	}).then((data) => {
		console.log(data);
		res.sendStatus(204);
	});
};
exports.seeSpaceficCategory = (req, res) => {
	// console.log(req.query);
	Category.findAll({
		attributes: [ 'id', 'specfic', 'img' ],
		where: {
			type: req.query.type
		}
	}).then((data) => {
		// console.log(data);
		res.send(data);
	});
};
exports.seeSpicfic = (req, res) => {
	Category.findAll({
		attributes: [ 'specfic' ],
		where: {
			type: req.query.type
		}
	}).then((data) => {
		res.send(data);
	});
};
exports.seeListMerchandise = (req, res) => {
	// console.log(req.query);
	Item.findAll({
		where: {
			categoryId: req.query.id
		}
	}).then((data) => {
		res.send(data);
	});
};
