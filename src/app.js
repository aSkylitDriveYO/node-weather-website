const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public/index.html'));

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    name: 'Chris',
  });
});

app.get('/about', (req, res) => {
  return res.render('about', {
    title: 'about',
    name: 'Chris',
  });
});

app.get('/help', (req, res) => {
  return res.render('help', {
    message: 'test message',
    title: 'help',
  });
});

// app.get('/help', (req, res) => {
//   return res.send({
//     name: 'Chris',
//     age: 27,
//   });
// });

// app.get('/about', (req, res) => {
//   return res.send('Test About');
// });

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // return res.send({
  //   forecast: 'Clear Skies',
  //   location: 'Phoenix',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  return res.send({
    products: [3],
  });
});

app.get('/help/*', (req, res) => {
  return res.render('404', {
    errorMessage: 'Test help article 404',
    title: '404',
    name: 'Chris',
  });
});

app.get('*', (req, res) => {
  return res.render('404', {
    errorMessage: 'Test 404',
    title: '404',
    name: 'Chris',
  });
});

app.listen(port, () => {
  console.log(`Server started on` + port);
});

//npm start, open your browser and run localhost:port
