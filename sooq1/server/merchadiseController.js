const {
	User,
	Item,
	Category,
	Frinde,
	Chat,
	Image,
	Item_Watched,
	Comment,
	Shop,
	Watched
} = require('./database/module');

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
	console.log(req.body);
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
	console.log(req.query);
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
	Image.findAll({
		attributes: [ 'img' ],
		include: [
			{
				model: Item,
				where: {
					categoryId: req.query.id
				},
				attributes: [ 'id', 'title', 'cost' ]
			}
		]
	}).then((data) => {
		res.send(data);
	});
};
exports.seeUserInfo = (req, res) => {
	User.findOne({
		attributes: [ 'name', 'img', 'location' ],
		where: {
			id: req.query.id
		}
	}).then((data) => {
		res.send(data);
	});
};
exports.seeUserMerc = (req, res) => {
	Item.findAll({
		where: {
			userId: req.query.id
		}
	}).then((data) => {
		res.send(data);
	});
};
exports.imageitem = (req, res) => {
	Image.findAll({
		attributes: [ 'img' ],
		where: {
			itemId: req.query.id
		}
	}).then((images) => res.send(images));
};
exports.itempage = (req, res) => {
	console.log('hello');
	Item.findOne({
		attributes: [ 'title', 'descrbtion', 'cost' ],
		where: {
			id: req.query.id
		},
		include: [
			{
				model: User,
				attributes: [ 'name', 'location', 'img' ]
			}
		]
	}).then((data) => res.send(data));
};
exports.itemcommint = (req, res) => {
	Comment.findAll({
		attributes: [ 'comment' ],
		where: {
			itemId: req.query.id
		}
	}).then((commint) => res.send(commint));
};
