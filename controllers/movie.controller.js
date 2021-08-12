'use strict';
const axios = require('axios');
const Movie = require('../models/movie.model');
require('dotenv').config();
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helpers/Cache.helper');
const moviesCache = new Cache();

//http://localhost:8000/movies?api_key=1dcf83331301e64bda3cf78fd359f8ce&city=amman

const movieController = (req, res) => {
  let city_name = req.query.city;

  const millis = Date.now() - moviesCache.timeStamp;

  if (moviesCache.moviesData && (millis < 1000 * 60 * 60 * 24)) {
    res.json({ message: 'data from cache', data: moviesCache.moviesData });
  }

  else {

    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city_name}`;
    axios.get(moviesUrl).then((Response) => {
      let shawnData = Response.data.results.map((movie) => {
        return new Movie(movie);
      });

      moviesCache.moviesData = shawnData;
      moviesCache.timeStamp = Date.now();
      res.json(shawnData);

    })
      .catch((error) => {
        res.send(error.message);
      });

  }
}
module.exports = movieController;