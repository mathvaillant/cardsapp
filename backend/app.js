const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const colors = require('colors');
const AppError = require('./utils/AppError');
const { globalErrorController } = require('./controllers/errors/globalErrorController');

const usersRouter = require('./routes/usersRoutes');
const cardsRoutes = require('./routes/cardsRoutes');
const cardCollectionsRoutes = require('./routes/cardCollectionsRoutes');

const connectDatabase = require('./config/dbConnection');
connectDatabase();

const app = express();

// 1) Global Middlewares
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 2) Routes
app.use('/users', usersRouter);
app.use('/cards', cardsRoutes);
app.use('/cardCollections', cardCollectionsRoutes);

// 3) Handle 404 routes 
app.all('*', (req, res, next) => { 
  next(new AppError(`Can't find ${req.originalUrl}`)); 
});

// 4) Global error handler
app.use(globalErrorController);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}`));