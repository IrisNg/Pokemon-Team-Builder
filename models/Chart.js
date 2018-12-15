var mongoose = require('mongoose');

var ChartSchema = new mongoose.Schema({
   types: [
      {
         name: String,
         icon: String,
         color: String,
         superEffective: [String],
         notEffective: [String],
         noEffect: [String]
      }
   ]
});

var Chart = mongoose.model('Chart', ChartSchema);

module.exports = Chart;
