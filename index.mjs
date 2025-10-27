import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
console.log("TMDB key loaded:", !!process.env.TMDB_API_KEY);

import {createRequire} from 'module';
const cjsImport = createRequire(import.meta.url);
const billboard = cjsImport('billboard-top-100');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async(req, res) => {
    res.render('home.ejs');
}); // not sure what else to do here


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