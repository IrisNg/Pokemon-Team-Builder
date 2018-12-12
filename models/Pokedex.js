var mongoose = require('mongoose');

var PokedexSchema = new mongoose.Schema({
   nationalPokedex: [
      {
         name: String,
         id: Number,
         image: String,
         types: { type1: String, type2: String },
         versions: [String],
         evolveByTrade: Boolean
      }
   ]
});

var Pokedex = mongoose.model('Pokedex', PokedexSchema);

module.exports = Pokedex;
