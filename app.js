var express = require('express'),
   app = express(),
   mongoose = require('mongoose'),
   Pokedex = require('./models/Pokedex'),
   Chart = require('./models/Chart'),
   typesSeed = require('./models/Seed');

mongoose.connect(
   'mongodb://localhost:27017/pokemon_team_builder',
   { useNewUrlParser: true }
);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//
app.get('/team_builder', (req, res) => {
   Pokedex.find({}, (err, foundPokedex) => {
      if (err) {
         console.log(err);
      } else {
         Chart.find({}, (err, foundChart) => {
            if (err) {
               console.log(err);
            } else {
               //destructuring the pokedex from the stored document
               var { nationalPokedex } = foundPokedex[0];
               //destructuring the types from the stored document
               var { types } = foundChart[0];
               //Converting the names of the pokemon to uppercase
               nationalPokedex.forEach(pokemon => {
                  pokemon.name = pokemon.name.toUpperCase();
               });
               res.render('index', { pokedex: nationalPokedex, types: types });
            }
         });
      }
   });
});

// app.get('/types/new', (req, res) => {
//    Chart.create(typesSeed, (err, createdChart) => {
//       if (err) {
//          console.log(err);
//       } else {
//          console.log(createdChart);
//       }
//    });
//    res.send('making');
// });

app.get('/types', (req, res) => {
   Chart.find({}, (err, foundChart) => {
      if (err) {
         console.log(err);
      } else {
         res.send(foundChart);
      }
   });
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log('Server is up and running!'));
