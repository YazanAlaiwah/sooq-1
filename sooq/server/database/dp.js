const Sequelize = require('sequelize');

const sequelize = new Sequelize('sooq', 'root', '123', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});
sequelize.sync({ force: false, logging: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
