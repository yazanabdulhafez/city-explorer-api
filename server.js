'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

const weatherController=require('./controllers/weather.controller')
const movieController=require('./controllers/movie.controller');
const startController = require('./controllers/start.controller');

/////////////////////* create the end points *///////////////////////
app.get('/',startController)

app.get('/weather',weatherController)

app.get('/movies',movieController)

/////////////////////* the app port listener *///////////////////////

app.listen(PORT, () => {
  console.log(`you are veiwing port : ${PORT}`);
});



