const request = require('request');
const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapAT = 'pk.eyJ1IjoiYWp1bGthOSIsImEiOiJjandsZ24ydnkwd3pvNGNwY3I3bnFxeTdrIn0.cCEStTlpgJEczXQ0-zxeFQ';
const getGeoLocation = (city,callback)=>{
    console.log('getGeoLocation for city : '+ city);
    mapUrl = mapURL+city+'.json'+'?access_token='+mapAT;
    console.log('Map URL : '+ mapUrl);
    request({
        url: mapUrl,
        json:true
    }, callback);
}
module.exports = getGeoLocation;