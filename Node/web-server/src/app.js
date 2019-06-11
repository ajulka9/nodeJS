const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs');
const geoLocation = require('./utils/geoLocation');
const getWeather = require('./utils/getWeather');
// Define Paths for Express.
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set express config(views and static)
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);

// Routes
app.get('/about', function (req, res) {
    res.statusCode = 200;
    const now = new Date();
    res.render('views/about', {
        name: 'Abhishek Julka',
        time: now.getUTCDate(),
        title: 'About Page',
        title: 'about',
        author: 'Abhishek Julka'
    })
});

app.get('/', function (req, res) {
    res.render('views/index', {
        title: 'home'
    })
});

app.get('/weather', (req, res) => {
    var data = 'No Data';
    if (req.query.city) {
        // we have a query param;
        var city = req.query.city;
        console.log('Requesting weather for city : ' + city);
        var data = getWeatherDataForLocation(res, city);
        console.log('Data to return ; ' + JSON.stringify(data));
        // res.render('views/weather', {
        //     data: data,
        //     title: 'Weather Info',
        //     author: 'Abhishek Julka'
        // });
    }else{
        res.render('views/weather', {
            data: data,
            title: 'Weather Info',
            author: 'Abhishek Julka'
        });
    }
});

    

var getWeatherData = (res, placeData) => {
    getWeather(placeData, (error, placeData, response) => {
        console.log('Callback for getting weather data called!!');
        if (error) {
            console.log('Error : ' + error);
            res.send({
                error
            });
        } else {
            if (response.statusCode / 100 != 2) {
                console.log('Status Code: ' + response.statusCode + ' error : ' + JSON.stringify(response.body));
                res.send(response.body);
            } else {
                console.log('Weather response : ' + response.body.currently);
                res.send({
                    placeData,
                    temp: response.body.currently
                });
            }
        }
    })
}

const getWeatherDataForLocation = (res, city) => {
    geoLocation(city, function (error, response) {
        if (error) {
            res.send({
                error
            });
        } else if (response !== undefined && response.statusCode / 100 == 2) {
            var data = response.body;
            var placeData = parseCordinates(data);
            getWeatherData(res, placeData);
        }
    });
}

var parseCordinates = (data) => {
    console.log('parseCordinates');
    var feature = data.features[0];
    var placeData = {
        cordinates: feature.center.reverse(),
        place_name: feature.place_name
    }
    return placeData;
}
// Start Server.
app.listen(3000, () => {
    console.log('server is up and running on 3000!');
})