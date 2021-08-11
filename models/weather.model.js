'use strict';

/////////////////////* the class component *///////////////////////

class Forecast {
  constructor(description, date, minTemp, maxTemp) {
    this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    this.date = date;
  }
}

module.exports = Forecast;