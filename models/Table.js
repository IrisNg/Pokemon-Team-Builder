var mongoose = require('mongoose');

var TableSchema = new mongoose.Schema({
   normal: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fighting: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   flying: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   poison: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ground: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   rock: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   bug: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ghost: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   steel: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fire: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   water: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   grass: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   electric: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   psychic: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ice: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   dragon: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   dark: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fairy: {
      type: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   }
});

var Table = mongoose.model('Table', TableSchema);

module.exports = Table;
