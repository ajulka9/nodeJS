console.log('Client js loaded!');



const onWeather = (city)=>{
    console.log('On Weather!!');
    fetch('http://localhost:3000/weather?city='+city).then((response)=>{
    console.log('First Then');
    response.json().then((data)=>{
        console.log('Second then');
        console.log(data);
        weatherResult.innerHTML = JSON.stringify(data);
    })
});
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherResult = document.querySelector('#weather-result');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    onWeather(search.value);
});