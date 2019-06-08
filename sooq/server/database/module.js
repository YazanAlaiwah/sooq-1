import { sequelize, Sequelize } from './dp';

const User = sequelize.define({
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	email: { type: Sequelize.STRING, required: true, unique: true },
	password: { type: Sequelize.STRING, required: true },
	name: { type: Sequelize.STRING, required: true },
	location: { type: Sequelize.STRING },
	img: { type: Sequelize.STRING },
	phonenumber: { type: Sequelize.NUMBER }
});

const Item = sequelize.define({
	id: { type: Sequelize.INTEGER, autoIncrement: true },
	img: { type: Sequelize.STRING },
	descrbtion: { type: Sequelize.TEXT },
	title: { type: Sequelize.STRING },
	cost: { type: Sequelize.STRING }
});
const Catogory = sequelize.define({
	id: { type: Sequelize.INTEGER, autoIncrement: true },
	type: { type: Sequelize.STRING },
	specfic: { type: Sequelize.STRING }
});
