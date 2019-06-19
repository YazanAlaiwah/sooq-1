const sooqRouter = require('express').Router();
const Athuntiction = require('./controllerAthuntction');
const Merchandise = require('./merchadiseController');
sooqRouter.route('/signup').post(Athuntiction.signup);
sooqRouter.route('/signin').get(Athuntiction.signin);
sooqRouter.route('/addMerc').post(Merchandise.addMerchandise);
sooqRouter.route('/rmMerc').post(Merchandise.removeMerchandise);
sooqRouter.route('/spaceficCategory').get(Merchandise.seeSpaceficCategory);
sooqRouter.route('/seeSpicfic').get(Merchandise.seeSpicfic);
sooqRouter.route('/seeListMerchandise').get(Merchandise.seeListMerchandise);
sooqRouter.route('/seeUserInfo').get(Merchandise.seeUserInfo);
sooqRouter.route('/seeUserMerc').get(Merchandise.seeUserMerc);
sooqRouter.route('/imageitem').get(Merchandise.imageitem);
sooqRouter.route('/itempage').get(Merchandise.itempage);
sooqRouter.route('/itemcommint').get(Merchandise.itemcommint);
sooqRouter.route('/addcommint').post(Merchandise.addcommint);

module.exports = sooqRouter;
