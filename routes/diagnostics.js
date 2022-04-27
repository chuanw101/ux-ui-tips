const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // Logic for appending data to the db/diagnostics.json file
  console.log(req.body);

  if (req.body) {
    const newDiag = {
      time: + new Date(),
      tip_id: uuidv4(),
      errors: req.body
    };

    readAndAppend(newDiag, './db/diagnostics.json');
    res.json(req.body);
  } else {
    res.error('Error in adding diagnostic');
  }
});

module.exports = diagnostics;
