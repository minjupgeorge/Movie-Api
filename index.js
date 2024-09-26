import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

import createLog from './middleware/createLog.js';
import movieRouter from './routes/movie.js';
import { title } from 'process';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 5009;

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(createLog);

// serve static files
app.use(express.static(path.join(PATH, 'public')));

// use routes
app.use('/api', movieRouter);

// handle 404
app.use('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Page',
        message: 'Page not found'
    });
});

// error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('404', {
        title: '500 Page',
        message: 'Internal server error'
    });
});
// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : http://localhost:${PORT}`);
});