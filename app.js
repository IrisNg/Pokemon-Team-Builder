var express = require('express'),
   app = express(),
   mongoose = require('mongoose'),
   Pokedex = require('./models/Pokedex'),
   Chart = require('./models/Chart'),
   typesSeed = require('./models/TypeSeed'),
   Table = require('./models/Table'),
   tableSeed = require('./models/TableSeed');

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
               Table.find({}, (err, foundTable) => {
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
                     res.render('index', { pokedex: nationalPokedex, types: types, table: foundTable[0] });
                  }
               });
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

// app.get('/table/new', (req, res) => {
//    Table.create(tableSeed, (err, createdTable) => {
//       if (err) {
//          console.log(err);
//       } else {
//          console.log(createdTable);
//       }
//    });
//    res.send('making table');
// });

app.get('/table', (req, res) => {
   Table.find({}, (err, foundTable) => {
      if (err) {
         console.log(err);
      } else {
         res.send(foundTable);
      }
   });
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log('Server is up and running!'));
