const express = require('express');

const app = express();

const bodyParser = require('body-parser');

let port = 3000;

// bring body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const sequelize = require('./utils/database');

const User = require('./models/user.model');
const Note = require('./models/note.model');
const NoteType = require('./models/noteType.model');
const notif = require('./models/notif.model');

sequelize
// .sync({ force: true }) // to force sql changes
    .sync()
    .then((res) => {
        console.log('database connected successfully');
    }).catch((err) => {
        console.log(err);
    })

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});

// bring apis routes
const api = require('./routes/index');
app.use('/api', api);


app.listen(port, () => {
    console.log('app is running on http://localhost:' + port);
});