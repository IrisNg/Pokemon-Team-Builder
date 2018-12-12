var express = require('express'),
   app = express(),
   mongoose = require('mongoose'),
   Pokedex = require('./models/Pokedex');

mongoose.connect(
   'mongodb://localhost:27017/pokemon_team_builder',
   { useNewUrlParser: true }
);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/seepokedex', (req, res) => {
   Pokedex.find({}, (err, foundPokedex) => {
      if (err) {
         console.log(err);
      } else {
         //destructuring the pokedex from the stored document
         var { nationalPokedex } = foundPokedex[0];
         //Converting the names of the pokemon to uppercase
         nationalPokedex.forEach(pokemon => {
            pokemon.name = pokemon.name.toUpperCase();
         });
         res.render('index', { pokedex: nationalPokedex });
      }
   });
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log('Server is up and running!'));
