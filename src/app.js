const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');


const app = express();
const port = process.env.PORT || 3000;


const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, '../public');


app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);



app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {title: "Weather", text:"Some text", name: "AUSPA"});
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: "help page",
        text: "this is some text",
        name: "AUSPA"
    });
});

app.get('/about', (req,res) => {
    res.render('help', {
        title: "About page",
        text: "about me",
        name: "John Doe"


    });
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address has been provided"
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
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
                address: req.query.address
            });
        });


    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "404",
        text: "Help page not found",
        name: "John Doe"

    });
});





// app.get('/help', (req,res) => {
//     res.send('Help page');
// });
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send([
        {
            products: []
        }
    ]);
});

app.get('*', (req,res) => {
    res.render('404', {
     title: "404",
     text: "404, page not found"
    });

});







app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

