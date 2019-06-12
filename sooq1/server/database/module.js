const { sequelize, Sequelize } = require('./dp');

const User = sequelize.define('user', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	email: { type: Sequelize.STRING, required: true, unique: true },
	password: { type: Sequelize.STRING, required: true },
	name: { type: Sequelize.STRING, required: true },
	location: { type: Sequelize.STRING },
	img: { type: Sequelize.STRING },
	phonenumber: { type: Sequelize.INTEGER },
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
	img: { type: Sequelize.STRING },
	descrbtion: { type: Sequelize.TEXT },
	title: { type: Sequelize.STRING },
	cost: { type: Sequelize.STRING },
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

User.hasMany(Item);
Item.belongsTo(User);
Category.hasMany(Item);
Item.belongsTo(Category);

module.exports.User = User;
module.exports.Item = Item;
module.exports.Category = Category;
