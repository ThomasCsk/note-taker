// The required node packages
const fs = require('fs');
const path = require('path');
const express = require('express');
const shortid = require('shortid');

// The json file and setting the app variable to express
const app = express();
const notes = require('./db/db.json');

// Middleware for express.js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Chooses the port based on if the server is hosted locally or through heroku
const PORT = process.env.PORT || 3001;

// Creates a new note with a unique id and adds it to an array
function createNote(body, noteArray){
  const note = {
    title: body.title,
    text: body.text,

    // Makes a unique id using the shortid node package
    id: shortid() 
  };

  // Checks the data being entered
  if (!validateNote(note)) {
    console.log('Please enter valid information into the Note Title and Note Text sections.');
    return false;
  }
  else {
    noteArray.push(note);
    fs.writeFileSync(  
      
      // Puts the new information into the json file
      path.join(__dirname, './db/db.json'),
      JSON.stringify(noteArray, null, 2)
    );
    return note;
  };
};

// Makes sure only proper/non-malicious data can be entered
function validateNote(note) {
  if(!note.title || typeof note.title !== 'string'){
    return false;
  };
  if(!note.text || typeof note.text !== 'string'){
    return false;
  };
  return true;
};

// Grabs the data in the json file and puts it on the screen to be accessed
app.get('/api/notes', (req,res) => {
  res.json(notes);
})

// Allows users to submit data to the json file
app.post('/api/notes', (req,res) => {
    const note = createNote(req.body, notes);
    res.json(note);
})

// Sends the user to the notes.html website when a button is clicked
app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));  
});

// Sends user to the index.html website by default
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

// Connects the server to whichever port the website should be accessed through
app.listen(PORT, () => {
  console.log(`The server is now on port ${PORT}!`);
})