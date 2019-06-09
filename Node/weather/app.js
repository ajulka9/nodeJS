const yargs = require('yargs');
const getGeoLocation = require('./geoLocation');
const getWeather = require('./getWeather');


var getWeatherData = (placeData)=> {
    getWeather(placeData, getWeatherCallback)
}


var getCordinates = (place)=>{
    getGeoLocation(place, getCordiantesCallback);
};

var getCordiantesCallback = (error, response)=>{
    console.log('getCordiantesCallback!');
    if(error){
        console.log('Error : '+ error);
        return null;
    } else{
        var data = response.body;
        var placeData = parseCordinates(data);
        getWeatherData(placeData);
    }
}

var getWeatherCallback = (error, placeData, response)=>{
        console.log('Callback for getting weather data called!!');
        if(error){
            console.log('Error : '+ error);
        }else{
            if(response.statusCode /100 != 2){
                console.log('Status Code: '+ response.statusCode + ' error : '+ JSON.stringify(response.body));
            } else{
                console.log('Weather response : '+ response.body.currently);
                printData(placeData,response.body.currently)
            }
        }
}

var parseCordinates = (data)=>{
    console.log('parseCordinates');
    var feature = data.features[0];
    var placeData = {
       cordinates: feature.center.reverse(),
       place_name: feature.place_name
    }
    return placeData;
}

var printData = (placeData, weatherData)=>{
    console.log('Currently in '+ placeData.place_name +
     ' it is '+ weatherData.apparentTemperature +
     ' temprature with overal '+ weatherData.summary +
     ' conditons, and '+ weatherData.humidity +' humidity!!');
    // console.log("Overal : "+ data.summary);
    // console.log("humidity : "+ data.humidity);
}

// Exectute.
// interactive mode
yargs.command({
    command:'getCurrent',
    describe:'get current weather of the given city.',
    builder: {
        city:{
            describe: 'city name for which current weather is needed.',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv){
       initGetCurrent(argv.city);
    }
});

var initGetCurrent = (city)=>{
    getCordinates(city);
};
yargs.parse(); 
