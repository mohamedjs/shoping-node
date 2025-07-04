import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { logger as appLogger } from './utils/logger.js';
import productEventService from './events/ProductEventService.js';

const __dirname = path.resolve();

import usersRouter      from './modules/users/routes.js';
import postsRouter      from './modules/posts/routes.js';
import categoriesRouter from './modules/categories/routes.js';
import productsRouter   from './modules/products/routes.js';

// Initialize event listeners
const initializeEventListeners = () => {
    try {
        // The ProductEventService is already initialized as a singleton
        // We just need to verify it's working
        appLogger.info('Event listeners initialized successfully');
        
        // You can add more event service initializations here
        // For example:
        // userEventService.initialize();
        // orderEventService.initialize();
    } catch (error) {
        appLogger.error('Failed to initialize event listeners', { error: error.message });
        // You might want to handle this error appropriately
        // For example, you might want to exit the process if event listeners are critical
        // process.exit(1);
    }
};

var app = express();

// Initialize event listeners before setting up routes
initializeEventListeners();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
