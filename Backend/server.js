const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.use

app.get('/', (req, res) => {
  res.render('homepage');
});

app.listen(8383);