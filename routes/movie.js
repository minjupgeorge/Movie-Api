import express from 'express';

import movieControllers from '../controllers/movie.js';

// routes
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    removeMovie,
    addMovieForm,
    updateMovieForm
} = movieControllers;

router.get('/get', getAllMovies);
router.get('/get/:id', getMovieById);
router.get('/add', addMovieForm);
router.post('/add', addMovie);
router.get('/update-movie/:id', updateMovieForm);
router.post('/update/:id', updateMovie);
router.delete('/delete/:id', removeMovie);

export default router;