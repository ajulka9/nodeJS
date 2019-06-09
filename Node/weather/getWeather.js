const request = require('request');
const weatherURL = 'https://api.darksky.net/forecast/707d5cefb4e7d5646fe6cd4b4cf73158/';
const mapAT = 'pk.eyJ1IjoiYWp1bGthOSIsImEiOiJjandsZ24ydnkwd3pvNGNwY3I3bnFxeTdrIn0.cCEStTlpgJEczXQ0-zxeFQ';
const getWeather = (placeData,callback)=>{
    console.log('getWeatherData for : '+ JSON.stringify(placeData));
    var weatherUrl = weatherURL + placeData.cordinates.join(',');
    console.log('weatherUrl : '+ weatherUrl);
    const options = {url: weatherUrl,json: true};
    request(options, function(error, response){
        callback(error, placeData, response)
    });
}
module.exports = getWeather;