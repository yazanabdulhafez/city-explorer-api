'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const weatherData = require('./data/weather.json')
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
// const axios = require('axios');

/////////////////////* create the end point*///////////////////////

//http://localhost:8000/weather?searchQuery=Amman&lon= 35.91&lat=31.95
app.get('/weather', (req, res) => {

  let city = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;
  try {

    let findCity = weatherData.find((element) => {
      console.log(element);
      if (element.city_name.toLowerCase() === city.toLowerCase() &&
        element.lat === Number(lat) && element.lon === Number(lon)) {
        return element;
      }
    })

    if (findCity !== undefined) {
      let shownData = [];

      findCity.data.map((city) => {
        shownData.push(
          new Forecast(
            city.weather.description,
            city.datetime,
            city.app_min_temp,
            city.app_max_temp
          )
        );
      });
      res.status(200).send(shownData);
    } else if (findCity === undefined) {
      res.send(`cant found ${city} use (Amman,Paris,Seattle)`);
    }
  } catch (e) {
    let err = {
      error: `cant found ${city} use (Amman,Paris,Seattle)`
    }
    res.status(404).send(err)
  }
})

/////////////////////* the class component *///////////////////////

class Forecast {
  constructor( description,date,minTemp,maxTemp) {
    this.description = `Low of ${minTemp}, high of ${maxTemp} with ${description}`;
    this.date = date;
  }
}

/////////////////////* the app port listener *///////////////////////

app.listen(PORT, () => {
  console.log(`you are veiwing port : ${PORT}`);
}); // kick start the express server to work
