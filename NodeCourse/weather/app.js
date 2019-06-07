const request = require('request');

const weatherURL = 'https://api.darksky.net/forecast/707d5cefb4e7d5646fe6cd4b4cf73158/';
const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapAT = 'pk.eyJ1IjoiYWp1bGthOSIsImEiOiJjandsZ24ydnkwd3pvNGNwY3I3bnFxeTdrIn0.cCEStTlpgJEczXQ0-zxeFQ';

var getWeatherData = (placeData)=> {
    var weatherUrl = weatherURL + placeData.cordinates.join(',');
    const options = {url: weatherUrl,json: true};
    request(options, function(error, response){
        if(error){
            console.log('Error : '+ error);
        }else{
            debugger
            if(response.statusCode /100 != 2){
                console.log('Status Code: '+ response.statusCode + ' error : '+ JSON.stringify(response.body));
            } else{
                console.log('Weather response : '+ response.body.currently);
                printData(placeData,response.body.currently)
            }
           
        }
    });
}


var getCordinates = (place, at)=>{
    console.log('Getting coordiantes for : '+ place);
    mapUrl = mapURL+place+'.json'+'?access_token='+at;
    console.log('Map URL : '+ mapUrl);
    request({
        url: mapUrl,
        json:true
    }, getCordiantesCallback);
};

var getCordiantesCallback = (error, response)=>{
    console.log('getCordiantesCallback!');
    if(error){
        console.log('Error : '+ error);
        return null;
    } else{
        var response = response;
        var data = response.body;
        parseCordinates(data);
    }
}
var parseCordinates = (data)=>{
    var feature = data.features[0];
    var placeData = {
       cordinates: feature.center,
       place_name: feature.place_name
    }
    if(placeData){
        console.log('Parced place Data: '+ placeData.cordinates + ' - '+ placeData.place_name);
        getWeatherData(placeData);
    }
}

getCordinates('Sunnyvale', mapAT);



var printData = (placeData, weatherData)=>{
    console.log('Currently in '+ placeData.place_name +
     ' it is '+ weatherData.apparentTemperature +
     ' temprature with overal '+ weatherData.summary +
     ' conditons, and '+ weatherData.humidity +'humidity!!');
    // console.log("Overal : "+ data.summary);
    // console.log("humidity : "+ data.humidity);
}