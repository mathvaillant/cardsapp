import { NextFunction, Request, Response } from "express";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors, { bgBlue, blue, red } from 'colors';
import helmet from 'helmet';
import mongoSanitizer from 'express-mongo-sanitize';
import AppError from './utils/AppError';
import connectDatabase from '../config/dbConnection';

// Routes 
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import collectionsRouter from './routes/collections';

// Global Error 
import { globalErrorController } from './controllers/errors/globalErrorController';

const dotenv = require('dotenv').config();

connectDatabase();

const app = express();

// 1) Global Middlewares
app.use(helmet());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL injection
app.use(mongoSanitizer());

// 2) Routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/collections', collectionsRouter);

// 3) Handle 404 routes 
app.all('*', (req: Request, res: Response, next: NextFunction) => { 
  next(new AppError(`Can't find ${req.originalUrl}`, 404)); 
});

// 4) Global error handler
app.use(() => globalErrorController);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(bgBlue(`Listening on port ${port}`)));

process.on("uncaughtException", (error) => {
  console.log(red(error.message));
  console.error(error);
});
