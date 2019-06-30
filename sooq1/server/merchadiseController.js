const { sequelize } = require('./database/dp');
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
			descrbtion: descrbtion,
			title: title,
			cost: cost,
			userId: userId,
			categoryId: idcc.dataValues.id,
			clicked: 0
		}).then((data) => {
			console.log(data);
			Image.create({
				img: img,
				itemId: data.dataValues.id
			}).then((data) => {
				res.send(data);
			});
		});
	});
};

exports.removeMerchandise = (req, res) => {
	console.log(req.body);
	Image.destroy({
		where: {
			itemId: req.body.id
		}
	}).then((data) => {
		Item.destroy({
			where: {
				id: req.body.id
			}
		}).then((data) => {
			res.sendStatus(204);
		});
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
		attributes: [ 'name', 'img', 'location', 'createdAt' ],
		where: {
			id: req.query.id
		}
	}).then((data) => {
		res.send(data);
	});
};
exports.seeUserMerc = (req, res) => {
	sequelize
		.query(`select * from items join images where userId = ${req.query.id} and itemId = items.id`)
		.then((data) => res.send(data[0]));
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
	Item.findOne({
		where: {
			id: req.query.id
		},
		include: [
			{
				model: User
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
exports.addcommint = (req, res) => {
	Comment.create({
		comment: req.body.text,
		itemId: req.body.id
	});
};
exports.itemClicked = (req, res) => {
	console.log(req.body);
	Item.update({ clicked: sequelize.literal('clicked + 1') }, { where: { id: req.body.itemId } });
	Item_Watched.findOne({
		where: {
			itemId: req.body.itemId,
			userId: req.body.userId
		}
	}).then((data) => {
		if (!data) {
			console.log('hello');
			Item_Watched.create({
				itemId: req.body.itemId,
				userId: req.body.userId
			}).catch(function(err) {
				// print the error details
				console.log(err, 'request.body.email');
			});
		}
	});
};
exports.watched = (req, res) => {
	sequelize
		.query(
			`SELECT item_watcheds.*, items.*,images.img FROM item_watcheds LEFT JOIN items ON item_watcheds.itemId = items.id LEFT JOIN images ON item_watcheds.itemId = images.itemId WHERE item_watcheds.userId=${req
				.query.id};`
		)
		.then((data) => res.send(data));
};
exports.clicked = (req, res) => {
	Item.findOne({
		attributes: [ 'clicked' ],
		where: {
			id: req.query.id
		}
	}).then((data) => res.send(data));
};
exports.addshop = (req, res) => {
	console.log(req.body);
	Shop.create({
		img: req.body.data.img,
		type: req.body.data.specfic,
		descrbtion: req.body.data.descrbtion,
		saturday: req.body.data.saturday,
		sunday: req.body.data.sunday,
		monday: req.body.data.monday,
		tuesday: req.body.data.tuesday,
		wednesday: req.body.data.wednesday,
		thuresday: req.body.data.thuresday,
		friday: req.body.data.friday,
		userId: req.body.userId,
		location: req.body.data.location,
		phonenumber: Number(req.body.data.phonenumber),
		name: req.body.data.name
	});
};
exports.shopinfo = (req, res) => {
	Shop.findOne({
		where: {
			userId: req.query.id
		}
	}).then((data) => res.send(data));
};
exports.additemshop = (req, res) => {
	console.log(req.body);
	Shop.findOne({
		where: {
			id: req.body.shopId
		}
	}).then((data) => {
		Category.findOne({
			where: {
				specfic: data.dataValues.type
			},
			attributes: [ 'id' ]
		}).then((idcc) => {
			Item.create({
				descrbtion: req.body.descrbtion,
				title: req.body.title,
				cost: req.body.cost,
				shopId: req.body.shopId,
				categoryId: idcc.dataValues.id,
				clicked: 0
			}).then((data) => {
				console.log(data);
				Image.create({
					img: req.body.img,
					itemId: data.dataValues.id
				}).then((data) => {
					console.log(data);
				});
			});
		});
	});
};
exports.showshops = (req, res) => {
	Shop.findAll({}).then((data) => res.send(data));
};
exports.showshoppage = (req, res) => {
	Shop.findOne({
		where: {
			id: req.query.id
		}
	}).then((data) => res.send(data));
};
exports.addcommintshop = (req, res) => {
	Comment.create({
		comment: req.body.text,
		shopId: req.body.id
	});
};
exports.shopcommint = (req, res) => {
	Comment.findAll({
		attributes: [ 'comment' ],
		where: {
			shopId: req.query.id
		}
	}).then((commint) => res.send(commint));
};
exports.seeShopMerc = (req, res) => {
	console.log('hello datajfdkjjk');
	sequelize
		.query(`select * from items join images where shopId = ${req.query.id} and itemId = items.id`)
		.then((data) => res.send(data[0]));
};
