const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const bodyParser = require('body-parser');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const routeSignUp = require('./routes/signUp');
const routeSignIn = require('./routes/signIn');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', routeSignUp);
app.use('/', routeSignIn);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страницы с таким адресом нет')));

app.use(errors());

app.use(handleError);

app.listen(PORT);
