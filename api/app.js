require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const adminRouter = require('./routes/adminRoutes')
const patientRouter = require('./routes/patientRoutes')
const pharmacistRouter = require('./routes/pharmacistRoutes')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening to port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
