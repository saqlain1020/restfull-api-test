const express = require('express')
const app = express()
//Logger for incoming request in terminal
const morgan = require('morgan')
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect(process.env.REACT_APP_MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//initiate logger
app.use(morgan('dev'))
//Formatting incoming data into json
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Cross Error Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, PATCH, DELETE, POST')
        return res.status(200).json({})
    }
    next();
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

//Error response when there is no route available in above files
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//Response the resulting error to client
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;