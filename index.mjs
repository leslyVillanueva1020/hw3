import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
console.log("TMDB key loaded:", process.env.TMDB_API_KEY ? 'yes' : 'no');
const apiKey = process.env.TMDB_API_KEY;

import {createRequire} from 'module';
const cjsImport = createRequire(import.meta.url);
const billboard = cjsImport('billboard-top-100');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async(req, res) => {
    let year = 2005; //later will be randomized
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}&sort_by=popularity.desc`;

    const reponse = await fetch(url);
    const data = await reponse.json();
    console.log(data.results[0]);
    res.render('home.ejs');
});

//music
app.get('/music', (req, res) => {
    //some stuff unsure yet
});

//movies
app.get('/music', (req, res) => {
    //some stuff unsure yet
});

//mashup
app.get('/music', (req, res) => {
    //some stuff unsure yet
});

app.listen(3000, () => {
    console.log('server started');
});