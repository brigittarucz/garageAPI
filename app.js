const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require("body-parser");

// 1. VE 2. Parsers 3. Serve file statically 4. Routes 5. 404

app.set('views', './views');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not Found</h1>');
})

app.listen(3000);

