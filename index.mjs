import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
console.log("TMDB key loaded:", process.env.TMDB_API_KEY ? 'yes' : 'no');
const apiKey = process.env.TMDB_API_KEY;


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true})); //html forms with method post sends data as a urlencoded w/o it req.body will be empty

// marks current route so nav can highlight the active heart
app.use((req, res, next) => {
  res.locals.currentPath = req.path; // '/', '/music', '/movies', '/mashup'
  next();
});

//root route
app.get('/', async (req, res) => {
    let randYear = Math.floor(Math.random() * 10) + 2000;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${randYear}&sort_by=popularity.desc`;
    let response = await fetch(url);
    let data = await response.json(); //not doing anything yet with this data
    // console.log(data);

    const sampleMovies = data.results.slice(0,4);
    console.log(sampleMovies);

    res.render('home.ejs', {title: "Home",
        movies: sampleMovies,
        year: randYear
    });
});

//movie search
app.get('/movies/search', async (req, res) => {
    const query = (req.query.q || '').trim();
    const page = Number(req.query.page || 1);

    //no query render search page
    if(!query){
        res.render('movies_search.ejs', {title: "Search Movies",
            query:'', results: [],
            page:1, totalPages: 0,
            error: null
        });
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    res.render('movies_search.ejs', {title: "Search Movies",
            query: query, results: data.results || [],
            page: data.page, totalPages: data.totalPages || 1,
            error: null
        });
});

//movie details
app.get('/movies/:id', (req, res) => {
    res.render('movie_detail.ejs', {title:"Movie Details"});
});

//people search
app.get('/people/search', (req, res) => {
    res.render('people_search.ejs', {title:"Search People"});
});

//people detail
app.get('/people/:id', (req, res) => {
    res.render('people_detail.ejs', {title:"Person Details"});
});

app.listen(3000, () => {
    console.log('server started');
});