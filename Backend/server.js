const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

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
  
  if(errors.length){
  return res.render("homepage", {errors})
  }else{
  res.send('Registration successful');
  
  }
  
 
  
});




app.listen(8383);