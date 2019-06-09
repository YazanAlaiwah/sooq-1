const { User, Item, Category } = require('./database/module');

exports.addMerchandise = (req, res) => {
	const { img, descrbtion, title, cost, userId } = req.body;
	console.log(req.body);
	Category.findOne({
		where: {
			type: req.body.type,
			specfic: req.body.specfic
		},
		attributes: [ 'id' ]
	}).then((idcc) => {
		console.log(idcc.dataValues.id);
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
