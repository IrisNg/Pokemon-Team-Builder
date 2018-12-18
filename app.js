var express = require('express'),
   app = express(),
   mongoose = require('mongoose'),
   request = require('request'),
   requestPromise = require('request-promise'),
   //Data Models
   Pokedex = require('./models/Pokedex'),
   Chart = require('./models/Chart'),
   typesSeed = require('./models/TypeSeed'),
   Table = require('./models/Table'),
   tableSeed = require('./models/TableSeed');

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/pokemon_team_builder';
mongoose.connect(
   url,
   { useNewUrlParser: true }
);

// mongoose.connect(
//    'mongodb://localhost:27017/pokemon_team_builder',
//    { useNewUrlParser: true }
// );

mongodb: app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//
app.get('/', (req, res) => {
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

//SEED ROUTES ---------------------------------------------------------------------

//TYPES CHART -------------------------------------------------------------------
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
//TABLE PROTOTYPE ---------------------------------------------------------------
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

var server = app.listen(process.env.PORT || 5000, function() {
   var port = server.address().port;
   console.log('Express is working on port ' + port);
});
