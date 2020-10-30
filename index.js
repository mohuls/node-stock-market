const express = require('express');
const app = express()
const exphbs = require('express-handlebars');
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}))

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// API key: pk_d7f023faec384ea598edc4f584ca77a9 

//create call api function
function call_api(finished, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_d7f023faec384ea598edc4f584ca77a9', {json: true}, (err, res, body) => {
    if(err) {
        console.log(err)
    }
    if(res.statusCode == 200) {
        //console.log(body)
            finished(body)
        }
    })
}
// route handlebars pages
app.get('/', function (req, res) {
    call_api( (done) => {
        res.render('home', {
            stock: done
        });
    }, "fb")
})

app.post('/', function (req, res) {
    call_api( (done) => {
        //posted = req.body.stock_ticker
        res.render('home', {
            stock: done,
        });
    }, req.body.stock_ticker)
})


// route handlebars about page
app.get('/about', function (req, res) {
    res.render('about');
})

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,
    () => console.log("Server running on port: " + PORT)
);