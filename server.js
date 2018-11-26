const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const userObject = require('./app/controllers/note.UserController.js');
const PORT = process.env.PORT || 5000;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    res.render('welcome', { title: 'Hello World!' , user:'Ravi'});
});
app.get('/login', (req, res) => {
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    res.render('index', { title: 'Hello World!' , user:'Ravi'});
});
app.post('/login', (req, res) => {
	userList = userObject.findAll();
    res.render('usersDb',{title: 'Users List'});//,users: userList[0]});
});


require('./app/routes/note.routes.js')(app);
// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});