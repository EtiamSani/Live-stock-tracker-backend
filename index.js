
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1337;
const cors = require('cors');
const app = express();


app.use(express.json());


app.use(cors());


require('./app/models/models')

const priceRouter = require('./app/routers/priceRouter');
const watchListRouter =require('./app/routers/watchListRouter')
const companyRouter = require('./app/routers/companyRouter')


app.use('/price', priceRouter);
app.use('/watchlist',watchListRouter);
app.use('/company',companyRouter);


// middleware 404
app.use((req, res) => {

    res.status(404).json({
        statusCode: 404,
        message: "Not Found"
    });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log('http://localhost:' + PORT);
    }
});