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
// //POKEDEX ----------------------------------------------------------------------
// //Declaring variables to obtain pokedex entries
// var nPokedexEntry = {},
//    nationalPokedex = [];

// //Request function to get back all Pokemon information according to national pokedex id
// function requestPokemon(pokedexId) {
//    //Making a request-promise to Pokemon API
//    requestPromise(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`)
//       .then(body => {
//          var data = JSON.parse(body);
//          //Filling in the national pokedex entry with JSON data from Pokemon API
//          nPokedexEntry = {
//             name: data['forms'][0]['name'],
//             //id is the national pokedex number
//             id: data['id'],
//             image: data['sprites']['front_default'],
//             types: { type1: data['types'][0]['type']['name'] },
//             versions: [],
//             evolveByTrade: false
//          };
//          //Only add 2nd TYPE if the pokemon has it
//          if (data['types'][1]) {
//             nPokedexEntry.types.type2 = data['types'][1]['type']['name'];
//          }

//          nationalPokedex.push(nPokedexEntry);
//       })
//       .catch(err => {
//          console.log(err);
//       });
// }

// //FILTER SEARCH SETUP

// //Evolution Method
// //Finding pokemons that evolve by trade
// var evolution = { methodName: 'trade', evolvedList: [] };

// //Request function to get back a list of pokemons that can only evolve by trade
// function requestTrade(evolvedList) {
//    requestPromise('https://pokeapi.co/api/v2/evolution-trigger/2/')
//       .then(body => {
//          var data = JSON.parse(body);
//          data['pokemon_species'].forEach(entry => {
//             evolvedList.push(entry['name']);
//          });
//       })
//       .catch(err => {
//          console.log(err);
//       });
// }

// //Game Version
// //Finding which pokemons appear in which pokemon game version
// //'url' - Different generation's pokedex end with a different url number when making api requests
// //'dex' - All pokemon entries for each generation is stored in each pokedex
// var allGenDex = [
//    { dexName: 'redBlueYelDex', url: 2, dex: [] },
//    { dexName: 'goldSilvCrysDex', url: 3, dex: [] },
//    { dexName: 'rubySappEmerDex', url: 4, dex: [] },
//    { dexName: 'diaPearlDex', url: 5, dex: [] },
//    { dexName: 'platDex', url: 6, dex: [] },
//    { dexName: 'heartSoulDex', url: 7, dex: [] },
//    { dexName: 'blackWhiteDex', url: 8, dex: [] },
//    { dexName: 'blackWhite2Dex', url: 9, dex: [] },
//    { dexName: 'omegaAlphaDex', url: 15, dex: [] },
//    { dexName: 'xYDex', url: 12, dex: [] }
// ];

// //Request function to get back different generations of pokedex - by passing both arrays' elements as arguments
// function requestDex(dex, url) {
//    requestPromise(`https://pokeapi.co/api/v2/pokedex/${url}`)
//       .then(body => {
//          var data = JSON.parse(body);
//          data['pokemon_entries'].forEach(entry => {
//             dex.push({
//                genId: entry['entry_number'],
//                name: entry['pokemon_species']['name']
//             });
//          });
//       })
//       .catch(err => {
//          console.log(err);
//       });
// }

// app.get('/generate', (req, res) => {
//    //Number of times 'for' loop runs will be the number of pokemons' info retrieved from the api
//    //Example - i<=151 will be retrieving 151 pokemon! the entire first gen pokedex
//    for (var k = 1; k <= 151; k++) {
//       requestPokemon(k);
//    }
//    //executing the function to get back a list of pokemons that evolved by trade
//    requestTrade(evolution.evolvedList);

//    //executing the function to get back different generations of pokedex
//    for (var i = 0; i < allGenDex.length; i++) {
//       requestDex(allGenDex[i].dex, allGenDex[i].url);
//    }

//    //Because the requests to Pokemon API need time to perform
//    setTimeout(() => {
//       //Sorting returned requests according to national pokedex number
//       nationalPokedex.sort((a, b) => a.id - b.id);

//       //Crosschecking which pokemons appear in which game versions
//       //And adding that version name to the pokemon's national entry
//       nationalPokedex.forEach(nPokedexEntry => {
//          allGenDex.forEach(genDex => {
//             genDex.dex.forEach(dexEntry => {
//                if (nPokedexEntry.name === dexEntry.name) {
//                   nPokedexEntry.versions.push(genDex.dexName);
//                }
//             });
//          });

//          //Crosschecking which pokemons evolved by trade
//          if (evolution.evolvedList.includes(nPokedexEntry.name)) {
//             nPokedexEntry.evolveByTrade = true;
//          }
//       });
//       // //testing
//       // console.log(nationalPokedex[143].versions);
//       // console.log(evolution.evolvedList);

//       //Adding to database (JUST ONCE)
//       Pokedex.create({ nationalPokedex: nationalPokedex }, function(err, createdDex) {
//          if (err) {
//             console.log(err);
//          } else {
//             console.log(createdDex);
//          }
//       });

//       res.send(nationalPokedex);
//    }, 7000);
// });

// app.get('/seepokedex', (req, res) => {
//    Pokedex.find({}, (err, foundEntries) => {
//       if (err) {
//          console.log(err);
//       } else {
//          res.send(foundEntries);
//       }
//    });
// });
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
