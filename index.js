const express = require("express");
const app = express();
const port = 4000;
const bodyPs = require("body-parser");

app.use(bodyPs.urlencoded({extended : false}))
app.use(bodyPs.json());

const filmRouter = require ("./routes/film");
app.use ("/api/film",filmRouter);

const genreRouter = require ("./routes/genre");
app.use ("/api/genre",genreRouter);

const userRouter = require ("./routes/user");
app.use ("/api/user",userRouter);

const pemainRouter = require ("./routes/pemain");
app.use ("/api/pemain",pemainRouter);

const bintangfilmRouter = require ("./routes/bintangfilm");
app.use ("/api/bintangfilm",bintangfilmRouter);

const sutradaraRouter = require ("./routes/sutradara");
app.use ("/api/sutradara",sutradaraRouter);

const reviewRouter = require ("./routes/review");
app.use ("/api/review",reviewRouter); 


app.listen(port,() => {
    console.log (`aplikasi berjalan di http::localhost:${port}`);
} )