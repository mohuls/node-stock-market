const express = require('express');
const app = express()
const exphbs = require('express-handlebars');
var router = express.Router()
const path = require('path');

const PORT = process.env.PORT || 5000;


// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('home', {
        stuff: "This is stuff"
    });
})


// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,
    () => console.log("Server running on port: " + PORT)
);

module.exports = router