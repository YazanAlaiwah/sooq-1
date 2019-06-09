const sooqRouter = require('express').Router();
const Athuntiction = require('./controllerAthuntction');
const Merchandise = require('./merchadiseController');
sooqRouter.route('/signup').post(Athuntiction.signup);
sooqRouter.route('/signin').get(Athuntiction.signin);
sooqRouter.route('/addMerc').post(Merchandise.addMerchandise);
sooqRouter.route('/rmMerc').delete(Merchandise.removeMerchandise);

module.exports = sooqRouter;
