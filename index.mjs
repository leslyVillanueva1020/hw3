import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
console.log("TMDB key loaded:", process.env.TMDB_API_KEY ? 'yes' : 'no');
const apiKey = process.env.TMDB_API_KEY;

const GOSSIP_2000s =[
    "Britney's 2007 comeback dominated headlines.",
    "'TomKat' (Tom Cruise & Katie Holmes) was everywhere.",
    "Lindsay Lohan's tabloid era defined mid-2000s gossip.",
    "Bennifer 1.0 kept the paparazzi busy.",
    "The Simple Life made celebutantes mainstream.",
    "The 'Leave Britney Alone' moment went viral.",
    "Paris Hilton's catchphrase 'That's hot' was ubiquitous.",
    "Justin & Britney's denim outfits live rent-free online.",
    "The 'Team Aniston vs. Team Jolie' era split magazines.",
    "Madonna's 'Hung Up' era brought disco back."
]

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

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

    let randgoss = Math.floor(Math.random() * 10);
    let selectedGossip = GOSSIP_2000s[randgoss];

    res.render('home.ejs', {title: "Home", gossip: selectedGossip});
});

//music
app.get('/music', (req, res) => {
    res.render('music.ejs', {title: "Music"});
});

//movies
app.get('/movies', (req, res) => {
    res.render('movies.ejs', {title:"Movies"});
});

//mashup
app.get('/mashup', (req, res) => {
    res.render('mashup.ejs', {title:"Mashup Time"});
});

app.listen(3000, () => {
    console.log('server started');
});