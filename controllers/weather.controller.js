'use strict';
const axios = require('axios');
const Forecast = require('../models/weather.model');
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Cache = require('../helpers/Cache.helper');
const foreCastCache = new Cache();


//http://localhost:8000/weather?key=81800f30dd4e4fc4801159eab53edc25&lat=31.95522&lon= 35.94503

const weatherController = (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const weatherkey = `weather-${lat}-${lon}`;

  if (lat && lon) {

    if (foreCastCache[weatherkey] && Date.now() - foreCastCache[weatherkey].timeStamp < 1000 * 60 * 60 * 24) {
      res.json({ message: 'data from cache', data: foreCastCache[weatherkey].savedData });
    } else {

      let weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
      axios.get(weatherBitUrl).then((Response) => {

        let weatherData = Response.data.data.map((element) => {
          return new Forecast(element.weather.description,
            element.datetime,
            element.app_min_temp,
            element.app_max_temp);
        });

        foreCastCache[weatherkey] = {};
        foreCastCache[weatherkey].savedData = weatherData;
        foreCastCache[weatherkey].timeStamp = Date.now();
        res.json({ message: 'data from API', data: weatherData });

      })
        .catch((error) => {
          res.send(error.message);
        });

    }
  } else {
    res.send('please enter the latitude and longitude ');
  }

};


module.exports = weatherController;