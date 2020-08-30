// const http = require('http');

const path = require('path');
const express = require('express');
const app = express();
const generalRoutes = require('./routes/routes');
const bodyParser = require("body-parser");

// const server = http.createServer(routes.requestHandler);

// 1. VE 2. Parsers 3. Serve file statically 4. Routes 5. 404

// set location of the templates
app.set('views', './views');

// set the ejs template engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

// Refer in link attribute as if you were in the folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', generalRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not Found</h1>');
})

app.listen(3000);
