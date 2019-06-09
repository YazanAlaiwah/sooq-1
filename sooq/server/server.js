const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/dp');
const User = require('./database/module');
const sooqRouter = require('./router');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('', sooqRouter);
app.get('/', (req, res) => {
	User.findAll();
	return res.send('hello world!');
});

app.listen(port, () => console.log(`server listening to port ${port}`));
