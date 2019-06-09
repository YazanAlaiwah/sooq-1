const Sequelize = require('sequelize');

const sequelize = new Sequelize('sooq1', 'root', '', {
	host: 'localhost',
	dialect: 'mysql'
});
sequelize.sync({ force: false, logging: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
