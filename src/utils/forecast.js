const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&appid=16ed70ce43c10b330c774bc764edb698&units=metric';
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.main.length === 0) {
            callback('Unable fetch data', undefined)
        } else {
            callback(undefined, 'Curent temperature is ' + body.main.temp + ' degrees. Feels like ' + body.main.feels_like + ' C. Max temperature today is '+ body.main.temp_max);
        }
    });

}



module.exports = forecast;

