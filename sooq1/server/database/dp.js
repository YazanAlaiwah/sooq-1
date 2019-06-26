const Sequelize = require('sequelize');

const sequelize = new Sequelize('NeWUbLgvRv', 'NeWUbLgvRv', '3Sbb9M7UXS', {
	host: 'remotemysql.com',
	dialect: 'mysql'
});
sequelize.sync({ force: false, logging: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
