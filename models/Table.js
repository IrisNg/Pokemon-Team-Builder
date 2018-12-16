var mongoose = require('mongoose');

var TableSchema = new mongoose.Schema({
   normal: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fighting: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   flying: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   poison: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ground: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   rock: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   bug: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ghost: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   steel: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fire: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   water: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   grass: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   electric: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   psychic: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   ice: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   dragon: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   dark: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   },
   fairy: {
      typeName: String,
      superEffective: [String],
      notEffective: [String],
      noEffect: [String]
   }
});

var Table = mongoose.model('Table', TableSchema);

module.exports = Table;
