const { sequelize, Sequelize } = require('./dp');

const User = sequelize.define('user', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	email: { type: Sequelize.STRING, required: true, unique: true },
	password: { type: Sequelize.STRING, required: true },
	name: { type: Sequelize.STRING, required: true },
	location: { type: Sequelize.STRING },
	img: { type: Sequelize.STRING },
	phonenumber: { type: Sequelize.INTEGER },
	backgroundImg: { type: Sequelize.STRING },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Item = sequelize.define('item', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

	descrbtion: { type: Sequelize.TEXT },
	title: { type: Sequelize.STRING },
	cost: { type: Sequelize.STRING },
	clicked: { type: Sequelize.INTEGER },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Category = sequelize.define('category', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	type: { type: Sequelize.STRING },
	specfic: { type: Sequelize.STRING },
	img: { type: Sequelize.STRING },
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Comment = sequelize.define('comment', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	comment: { type: Sequelize.STRING },
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Shop = sequelize.define('shop', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: Sequelize.STRING, unique: true },
	location: { type: Sequelize.STRING },
	phonenumber: { type: Sequelize.INTEGER },
	saturday: { type: Sequelize.STRING },
	sunday: { type: Sequelize.STRING },
	monday: { type: Sequelize.STRING },
	tuesday: { type: Sequelize.STRING },
	wednesday: { type: Sequelize.STRING },
	thursday: { type: Sequelize.STRING },
	friday: { type: Sequelize.STRING },
	descrbtion: { type: Sequelize.STRING },
	type: { type: Sequelize.STRING },
	img: { type: Sequelize.STRING },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Watched = sequelize.define('watched', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Image = sequelize.define('images', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	img: { type: Sequelize.STRING },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Chat = sequelize.define('chat', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	messeges: { type: Sequelize.TEXT },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Frinde = sequelize.define('frinds', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	createdAt: {
		// field: 'created_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		// field: 'updated_at',
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
});
const Item_Watched = sequelize.define('item_watched', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});

User.hasMany(Frinde);
Frinde.blongsTo(User, { as: 'user1' });
Frinde.blongsTo(User, { as: 'user2' });
User.hasMany(Chat);
Chat.blongsTo(User, { as: 'user1' });
Chat.blongsTo(User, { as: 'user2' });
User.hasMany(Item);
Item.blongsTo(User);
User.hasMany(Watched);
Watched.blongsTo(User);
User.hasMany(Shop);
Shop.blongsTo(User);
Item.blongsToMany(Watched, { through: Item_Watched });
Watched.blongsToMany(User, { through: Item_Watched });
Item.hasMany(Image);
Image.blongsTo(Item);
Item.hasMany(Comment);
Comment.blongsTo(Item);
Category.hasMany(Item);
Item.blongsTo(Category);
Category.hasMany(Shop);
Shop.blongsTo(Category);
Shop.hasMany(Item);
Item.blongsTo(Shop);
Shop.hasMany(Comment);
Comment.blongsTo(Shop);
module.exports.User = User;
module.exports.Item = Item;
module.exports.Category = Category;
