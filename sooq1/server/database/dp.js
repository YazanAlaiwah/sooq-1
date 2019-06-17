const Sequelize = require('sequelize');

const sequelize = new Sequelize('sooq2', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
sequelize.sync({ force: true, logging: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
