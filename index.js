const express = require('express');
const app = express()
const exphbs = require('express-handlebars');
var request = require('request')
const path = require('path');

const PORT = process.env.PORT || 5000;


// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// API key: pk_d7f023faec384ea598edc4f584ca77a9 

//create call api function
function call_api(finished) {
    request('https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_d7f023faec384ea598edc4f584ca77a9', {json: true}, (err, res, body) => {
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
    })
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