const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

//app.get()

//app.post()

//app.delete()

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
  
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
  console.log(`The server is now on port ${PORT}!`);
})