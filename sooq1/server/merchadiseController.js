const { sequelize } = require('./database/dp');
const { User, Item, Category, Image, Item_Watched, Comment, Shop } = require('./database/module');
// this part to add items in the database
exports.addMerchandise = (req, res) => {
	const { img, descrbtion, title, cost, userId } = req.body;
	Category.findOne({
		where: {
			type: req.body.type,
			specfic: req.body.specfic
		},
		attributes: [ 'id' ]
	}).then((idcc) => {
		Item.create({
			descrbtion: descrbtion,
			title: title,
			cost: cost,
			userId: userId,
			categoryId: idcc.dataValues.id,
			clicked: 0
		}).then((data) => {
			Image.create({
				img: img,
				itemId: data.dataValues.id
			}).then((data) => {
				res.send(data);
			});
		});
	});
};
// this part to remove items from the datavbase
exports.removeMerchandise = (req, res) => {
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
// this part to show the supCategory from the database
exports.seeSpaceficCategory = (req, res) => {
	Category.findAll({
		attributes: [ 'id', 'specfic', 'img' ],
		where: {
			type: req.query.type
		}
	}).then((data) => {
		res.send(data);
	});
};
//this part to show the supCategory from the database
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
// this part to show the items from the database
exports.seeListMerchandise = (req, res) => {
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
// this part to have user info from the database
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
// this part to show the items for the user from the database
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
//this part to show the item info and the user info from the database
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
// this part to show the comments for the item from the database
exports.itemcommint = (req, res) => {
	Comment.findAll({
		attributes: [ 'comment' ],
		where: {
			itemId: req.query.id
		}
	}).then((commint) => res.send(commint));
};
// this part to save the comment in the database
exports.addcommint = (req, res) => {
	Comment.create({
		comment: req.body.text,
		itemId: req.body.id
	});
};
// this part to save how many clicked for the item
exports.itemClicked = (req, res) => {
	Item.update({ clicked: sequelize.literal('clicked + 1') }, { where: { id: req.body.itemId } });
	Item_Watched.findOne({
		where: {
			itemId: req.body.itemId,
			userId: req.body.userId
		}
	}).then((data) => {
		if (!data) {
			Item_Watched.create({
				itemId: req.body.itemId,
				userId: req.body.userId
			}).catch(function(err) {
				console.log(err, 'request.body.email');
			});
		}
	});
};
// this part to show for the user what items he watched
exports.watched = (req, res) => {
	sequelize
		.query(
			`SELECT item_watcheds.*, items.*,images.img FROM item_watcheds LEFT JOIN items ON item_watcheds.itemId = items.id LEFT JOIN images ON item_watcheds.itemId = images.itemId WHERE item_watcheds.userId=${req
				.query.id};`
		)
		.then((data) => res.send(data));
};
// this part to show how many the item was clicked
exports.clicked = (req, res) => {
	Item.findOne({
		attributes: [ 'clicked' ],
		where: {
			id: req.query.id
		}
	}).then((data) => res.send(data));
};
// this part to save shops in the database
exports.addshop = (req, res) => {
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
// this part to show the shop info for the users
exports.shopinfo = (req, res) => {
	Shop.findOne({
		where: {
			userId: req.query.id
		}
	}).then((data) => res.send(data));
};
// this part to save the item of the shops in the database
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
				Image.create({
					img: req.body.img,
					itemId: data.dataValues.id
				}).then((data) => {});
			});
		});
	});
};
// this part to show the shops for the users
exports.showshops = (req, res) => {
	Shop.findAll({}).then((data) => res.send(data));
};
// this part to show the shop info from the database
exports.showshoppage = (req, res) => {
	Shop.findOne({
		where: {
			id: req.query.id
		}
	}).then((data) => res.send(data));
};
// this part to save the comments of the shops in the database
exports.addcommintshop = (req, res) => {
	Comment.create({
		comment: req.body.text,
		shopId: req.body.id
	});
};
// this part to show the shop comments from teh database
exports.shopcommint = (req, res) => {
	Comment.findAll({
		attributes: [ 'comment' ],
		where: {
			shopId: req.query.id
		}
	}).then((commint) => res.send(commint));
};
// this part to show the shop items from the database
exports.seeShopMerc = (req, res) => {
	sequelize
		.query(`select * from items join images where shopId = ${req.query.id} and itemId = items.id`)
		.then((data) => res.send(data[0]));
};
