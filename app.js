// SETTING UP DEPENDENCIES
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

// SETTING UP MONGOOSE
var url = process.env.DATABASEURL || 'mongodb://helloUSER:hellothere1@ds031721.mlab.com:31721/pokemon_team_builder';
// var url = 'mongodb://localhost:27017/pokemon_team_app';
mongoose.connect(url, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// INDEX PAGE -------------------------------------------------------------------
app.get('/', function(req, res) {
   Pokedex.find({}, function(err, foundPokedexes) {
      if (err) {
         console.log(err);
      } else {
         Chart.find({}, function(err, foundChart) {
            if (err) {
               console.log(err);
            } else {
               Table.find({}, function(err, foundTable) {
                  if (err) {
                     console.log(err);
                  } else {
                     //Merging the two nationalPokedex entries (because making 649 requests one shot to the pokemon API server was too much to handle)
                     //All pokedex generations up to pokemon black2/white2 gen
                     var nationalPokedex = foundPokedexes[1].nationalPokedex.concat(foundPokedexes[2].nationalPokedex);
                     // For only first gen pokedex, use the following line of code to substitute the code line above
                     // var { nationalPokedex } = foundPokedexes[0];
                     //destructuring the types from the stored document
                     var { types } = foundChart[0];
                     //Converting the names of the pokemon to uppercase
                     nationalPokedex.forEach(function(pokemon) {
                        pokemon.name = pokemon.name.toUpperCase();
                     });
                     res.render('index', { nPokedex: nationalPokedex, types: types, table: foundTable[0] });
                  }
               });
            }
         });
      }
   });
});

// /*------------------------------------- SEED ROUTES  (Data already on MLab server, only here for reference) ------------------------------------*/

// // TYPES CHART -------------------------------------------------------------------

// app.get('/types/new', function(req, res) {
//    Chart.create(typesSeed, function(err, createdChart) {
//       if (err) {
//          console.log(err);
//       } else {
//          console.log(createdChart);
//       }
//    });
//    res.send('making');
// });

// app.get('/types', function(req, res) {
//    Chart.find({}, function(err, foundChart) {
//       if (err) {
//          console.log(err);
//       } else {
//          res.send(foundChart);
//       }
//    });
// });
// // TABLE PROTOTYPE ---------------------------------------------------------------

// app.get('/table/new', function(req, res) {
//    Table.create(tableSeed, function(err, createdTable) {
//       if (err) {
//          console.log(err);
//       } else {
//          console.log(createdTable);
//       }
//    });
//    res.send('making table');
// });

// app.get('/table', function(req, res) {
//    Table.find({}, function(err, foundTable) {
//       if (err) {
//          console.log(err);
//       } else {
//          res.send(foundTable);
//       }
//    });
// });

// // NATIONAL POKEDEX GENERATOR !!! ------------------------------------------------

// //DECLARING VARIABLES TO OBTAIN POKEDEX
// var nPokedexEntry = {};
// var nationalPokedex = [];

// //Request function to get back all Pokemon information according to national pokedex id
// function requestPokemon(pokedexId) {
//    //Making a request-promise to Pokemon API
//    requestPromise('https://pokeapi.co/api/v2/pokemon/' + pokedexId + '/')
//       .then(function(body) {
//          var data = JSON.parse(body);
//          //Filling in the national pokedex entry with JSON data from Pokemon API
//          nPokedexEntry = {
//             name: data.name,
//             //id is the national pokedex number
//             id: data.id,
//             image: data.sprites['front_default'],
//             types: { type1: data.types[0].type.name },
//             versions: [],
//             evolveByTrade: false
//          };
//          //Only add 2nd TYPE if the pokemon has it
//          if (data.types[1]) {
//             nPokedexEntry.types.type2 = data.types[1].type.name;
//          }

//          nationalPokedex.push(nPokedexEntry);
//       })
//       .catch(function(err) {
//          console.log(err);
//       });
// }

// //FILTER OPTIONS SETUP

// //Evolution Method
// //Finding pokemons that evolve by trade
// var evolution = { methodName: 'trade', evolvedList: [] };

// //Request function to get back a list of pokemons that can only evolve by trade
// function requestTrade(evolvedList) {
//    requestPromise('https://pokeapi.co/api/v2/evolution-trigger/2/')
//       .then(function(body) {
//          var data = JSON.parse(body);
//          data['pokemon_species'].forEach(function(entry) {
//             evolvedList.push(entry.name);
//          });
//       })
//       .catch(function(err) {
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
//    requestPromise('https://pokeapi.co/api/v2/pokedex/' + url + '/')
//       .then(function(body) {
//          var data = JSON.parse(body);
//          data['pokemon_entries'].forEach(function(entry) {
//             dex.push({
//                genId: entry['entry_number'],
//                name: entry['pokemon_species'].name
//             });
//          });
//       })
//       .catch(function() {
//          console.log(err);
//       });
// }

// app.get('/generate', function(req, res) {
//    //Number of times 'for' loop runs will be the number of pokemons' info retrieved from the api
//    //Example - k <= 151 will be retrieving 151 pokemon! the entire first gen pokedex
//    // k <= 493 will retrieve pokemons up to pokemon platinum generation (not including pokemon black2/white2 pokemon X & Y and sun & moon)
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
//    setTimeout(function() {
//       //Sorting returned requests according to national pokedex number
//       nationalPokedex.sort(function(a, b) {
//          return a.id - b.id;
//       });
//       //Crosschecking which pokemons appear in which game versions
//       //And adding that version name to the pokemon's national entry
//       nationalPokedex.forEach(function(nPokedexEntry) {
//          allGenDex.forEach(function(genDex) {
//             genDex.dex.forEach(function(dexEntry) {
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

//       //should get back the number of pokemons you requested
//       console.log(nationalPokedex.length);

//       // Adding to database (JUST ONCE)
//       Pokedex.create({ nationalPokedex: nationalPokedex }, function(err, createdDex) {
//          if (err) {
//             console.log(err);
//          } else {
//             console.log('Pokedex successfully created!');
//          }
//       });

//       res.send(nationalPokedex);
//       //...Assuming 70 seconds is enough to finish making 493 api requests to the pokemon API (depends on your internet speed)
//       // Increase the seconds value if you are not getting the full number of pokemon data back from the API
//    }, 70000);
// });

// PORT CONFIG -------------------------------------------------------------------
var server = app.listen(process.env.PORT || 5000, function() {
   var port = server.address().port;
   console.log('Express is working on port ' + port);
});
