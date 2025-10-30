import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
console.log("TMDB key loaded:", process.env.TMDB_API_KEY ? 'yes' : 'no');
const apiKey = process.env.TMDB_API_KEY;

const GOSSIP_2000s = [
  "Britney's 2007 comeback dominated headlines.",
  "'TomKat' (Tom Cruise & Katie Holmes) was everywhere.",
  "Lindsay Lohan's tabloid era defined mid-2000s gossip.",
  "Bennifer 1.0 kept the paparazzi busy.",
  "The Simple Life made celebutantes mainstream.",
  "The 'Leave Britney Alone' moment went viral.",
  "Paris Hilton's catchphrase 'That's hot' was ubiquitous.",
  "Justin & Britney's denim outfits live rent-free online.",
  "The 'Team Aniston vs. Team Jolie' era split magazines.",
  "Madonna's 'Hung Up' era brought disco back.",
  "MySpace top 8 caused real friendship drama.",
  "The iPod became the ultimate 2000s status symbol.",
  "Everyone tried to learn the 'Crank That (Soulja Boy)' dance.",
  "The 'Mean Girls' quotes took over every conversation.",
  "People lost hours customizing glittery MySpace pages.",
  "Low-rise jeans and Juicy Couture tracksuits ruled the malls.",
  "Avril Lavigne made ties and tank tops the punk uniform.",
  "VH1’s 'Flavor of Love' gave us unforgettable reality TV chaos.",
  "Everyone was obsessed with 'The OC' and 'Laguna Beach'.",
  "Flip phones were the peak of cool — bonus points if it was a Razr.",
  "Perez Hilton’s doodled celebrity blog ruled gossip culture.",
  "YouTube was born — and 'Charlie Bit My Finger' became iconic.",
  "MTV actually played music videos (and TRL was must-watch).",
  "Everyone wanted an AIM away message that was deep and mysterious.",
  "Twilight fans sparked the great 'Team Edward vs. Team Jacob' debate.",
  "The 'Britney vs. Christina' rivalry divided pop fans everywhere.",
  "Jennifer Lopez’s green Versace dress basically invented Google Images.",
  "BlackBerry Messenger was the ultimate communication flex.",
  "Apple’s 'Silhouette iPod' ads made dancing in public look cool.",
  "The first iPhone changed everything in 2007."
];


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

    let randgoss = Math.floor(Math.random() * GOSSIP_2000s.length);
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