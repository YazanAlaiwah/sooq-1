const sooqRouter = require('express').Router();
const Athuntiction = require('./controllerAthuntction');
const Merchandise = require('./merchadiseController');
sooqRouter.route('/signup').post(Athuntiction.signup);
sooqRouter.route('/signin').get(Athuntiction.signin);
sooqRouter.route('/addMerc').post(Merchandise.addMerchandise);
sooqRouter.route('/rmMerc').delete(Merchandise.removeMerchandise);
sooqRouter.route('/spaceficCategory').get(Merchandise.seeSpaceficCategory);
sooqRouter.route('/seeSpicfic').get(Merchandise.seeSpicfic);
sooqRouter.route('/seeListMerchandise').get(Merchandise.seeListMerchandise);

module.exports = sooqRouter;
