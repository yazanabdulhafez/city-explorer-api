'use strict';

/////////////////////* the class component *///////////////////////

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_vote = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.image_url = movieData.poster_path;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
  }
}

module.exports = Movie;