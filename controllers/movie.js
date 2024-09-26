import { v6 as Id } from 'uuid';

import Movie from '../models/movie.js';

const movieControllers = {
    getAllMovies: (req, res) => {
        const movies = Movie.getAll();
        res.status(200).render('movies', { movies });
    },
    getMovieById: (req, res) => {
        const { id } = req.params;
        const movie = Movie.getById(id);
        if (movie) {
            res.status(200).render('movie', { movie });
        } else {
            res.status(404).render('404', {
                title: 'Movie not found',
                message: 'The movie you are looking foes not exist'
            });
        }
    },
    addMovieForm: (req, res) => {
        res.status(200).render('add-movie');
    },
    addMovie: (req, res) => {
        const { title, logo,  year } = req.body;
        if (title && logo  && year) {
            Movie.add({ id: Id(), title, logo,  year });
            res.status(201).redirect('/api/get');
        } else {
            res.status(400).render('404', {
                title: 'Invalid input',
                message: 'Please enter valid movie details'
            });
        }
    },
    updateMovieForm: (req, res) => {
        const { id } = req.params;
        const movie = Movie.getById(id);
        if (movie) {
            res.status(200).render('update-movie', { movie });
        } else {
            res.status(404).render('404', {
                title: 'Movie not found',
                message: 'The movie does not exist'
            });
        }
    },
    updateMovie: (req, res) => {
        const { id } = req.params;
        const { title, logo, year } = req.body;
        const movie = Movie.getById(id);
        if (movie) {
            Movie.update(id, { title, logo, year });
            res.status(200).redirect('/api/get/');
        } else {
            res.status(404).render('404', {
                title: 'Movie not found',
                message: 'The movie does not exist'
            });
        }
    },
    removeMovie: (req, res) => {
        const { id } = req.params;
        const movie = Movie.getById(id);
        if (movie) {
            Movie.remove(id);
            res.status(200).redirect('/api/get');
        } else {
            res.status(404).render('404', {
                title: 'Movie not found',
                message: 'Movie does not exist'
            });
        }
    }
};

export default movieControllers;