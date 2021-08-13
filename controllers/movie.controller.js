'use strict';
const axios = require('axios');
const Movie = require('../models/movie.model');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helpers/Cache.helper');
// const moviesCache = new Cache();
// console.log(moviesCache);
const moviesCache = new Cache();
console.log(moviesCache);

//http://localhost:8000/movies?api_key=1dcf83331301e64bda3cf78fd359f8ce&city=amman

const movieController = (req, res) => {
  const city = req.query.city;
  const movieskey = `movies-${city}`;

  if (city) {

    if (moviesCache[movieskey] && Date.now() - moviesCache[movieskey].timeStamp < 86400000) {
      res.json({ message: 'data from Cache', data: moviesCache[movieskey].savedData });
    } else {
      let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
      axios
        .get(moviesUrl)
        .then((axiosResponse) => {
          const arrayOfMovies = axiosResponse.data.results.map((movie) => new Movie(movie));
          moviesCache[movieskey] = {};
          moviesCache[movieskey].savedData = arrayOfMovies;
          moviesCache[movieskey].timeStamp = Date.now();
          console.log(moviesCache);
          res.json({ message: 'data from API', data: arrayOfMovies });
        })
        .catch((error) => {
          res.send(error.message);
        });
    }
  } else {
    res.send('please enter the City name !!');
  }
};
module.exports = movieController;