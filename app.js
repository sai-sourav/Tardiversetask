const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const mainroute = require('./routes/mainroute');
const bodyparser = require('body-parser');
dotenv.config();

const app = express();

app.use(bodyparser.json());

app.use(mainroute);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PSWD}@cluster0.k8ohbbp.mongodb.net/Task?retryWrites=true&w=majority`)
.then((result) => {
    console.log("db connected");
    app.listen(4000);
})
.catch(err => {
    console.log(err);
})