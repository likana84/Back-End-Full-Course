const express = require('express');
const db = require("better-sqlite3")("users.db");
db.pragma('journal_mode = WAL'); //it improves the speed

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(function(req, res, next){
res.locals.errors = [];
next();
})

app.get('/', (req, res) => {
  res.render('homepage');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/register', (req, res) => {
  const errors = [];
  if(typeof req.body.username !== 'string') req.body.username = ""
  if(typeof req.body.password !== 'string') req.body.password = ""
  
  req.body.username = req.body.username.trim()// removes the whitespaces for the user, just in case he happens to have left.
  req.body.password = req.body.password.trim()
  
  if(!req.body.username) errors.push('you must provide your username');
  if(req.body.username && req.body.username.length < 3) errors.push('username must be greater than 3 charactera');
  if(req.body.username && req.body.username.length > 10) errors.push('username must not exceed 10 charactera');
  if(req.body.username && req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push('username can only contain letters and numbers');
  
  if(!req.body.password) errors.push('you must provide your password');
  if(req.body.password && req.body.password.length < 12) errors.push('Password must be greater than 12 characters');
  if(req.body.password && req.body.password.length > 70) errors.push('Password must not exceed 70 characters');

  if(errors.length){
  return res.render("homepage", {errors})
  }else{
  res.send('Registration successful');

  //save the new user to the database| npm install better-sqlite3
  //log the user in by giving them a cookie
  
  }
  
 
  
});




app.listen(8383);