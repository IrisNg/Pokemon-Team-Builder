module.exports = {
   types: [
      {
         name: 'normal',
         icon: 'https://i.imgur.com/T8MOm7P.png',
         superEffective: [],
         notEffective: ['rock', 'steel'],
         noEffect: ['ghost']
      },
      {
         name: 'fighting',
         icon: 'https://i.imgur.com/Pr97GQ1.png',
         superEffective: ['normal', 'rock', 'steel', 'ice', 'dark'],
         notEffective: ['flying', 'poison', 'bug', 'psychic', 'fairy'],
         noEffect: ['ghost']
      },
      {
         name: 'flying',
         icon: 'https://i.imgur.com/ZO54bmh.png',
         superEffective: ['fighting', 'bug', 'grass'],
         notEffective: ['rock', 'steel', 'electric'],
         noEffect: []
      },
      {
         name: 'poison',
         icon: 'https://i.imgur.com/Hh7FDun.png',
         superEffective: ['grass', 'fairy'],
         notEffective: ['poison', 'ground', 'rock', 'ghost'],
         noEffect: ['steel']
      },
      {
         name: 'ground',
         icon: 'https://i.imgur.com/Z8AVJ4a.png',
         superEffective: ['poison', 'rock', 'steel', 'fire', 'electric'],
         notEffective: ['bug', 'grass'],
         noEffect: ['flying']
      },
      {
         name: 'rock',
         icon: 'https://i.imgur.com/8fuHs1C.png',
         superEffective: ['flying', 'bug', 'fire', 'ice'],
         notEffective: ['fighting', 'ground', 'steel'],
         noEffect: []
      },
      {
         name: 'bug',
         icon: 'https://i.imgur.com/kpru1Y8.png',
         superEffective: ['grass', 'psychic', 'dark'],
         notEffective: ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy'],
         noEffect: []
      },
      {
         name: 'ghost',
         icon: 'https://i.imgur.com/UroikHx.png',
         superEffective: ['ghost', 'psychic'],
         notEffective: ['dark'],
         noEffect: ['normal']
      },
      {
         name: 'steel',
         icon: 'https://i.imgur.com/lmN1qDy.png',
         superEffective: ['rock', 'ice', 'fairy'],
         notEffective: ['steel', 'fire', 'water', 'electric'],
         noEffect: []
      },
      {
         name: 'fire',
         icon: 'https://i.imgur.com/ChmQPRq.png',
         superEffective: ['bug', 'steel', 'grass', 'ice'],
         notEffective: ['rock', 'fire', 'water', 'dragon'],
         noEffect: []
      },
      {
         name: 'water',
         icon: 'https://i.imgur.com/OYx24YT.png',
         superEffective: ['ground', 'rock', 'fire'],
         notEffective: ['water', 'grass', 'dragon'],
         noEffect: []
      },
      {
         name: 'grass',
         icon: 'https://i.imgur.com/h0mdNN0.png',
         superEffective: ['ground', 'rock', 'water'],
         notEffective: ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon'],
         noEffect: []
      },
      {
         name: 'electric',
         icon: 'https://i.imgur.com/nZbIwgv.png',
         superEffective: ['flying', 'water'],
         notEffective: ['grass', 'electric', 'dragon'],
         noEffect: ['ground']
      },
      {
         name: 'psychic',
         icon: 'https://i.imgur.com/b7EgqXU.png',
         superEffective: ['fighting', 'poison'],
         notEffective: ['steel', 'psychic'],
         noEffect: ['dark']
      },
      {
         name: 'ice',
         icon: 'https://i.imgur.com/Adij2NC.png',
         superEffective: ['flying', 'ground', 'grass', 'dragon'],
         notEffective: ['steel', 'fire', 'water', 'ice'],
         noEffect: []
      },
      {
         name: 'dragon',
         icon: 'https://i.imgur.com/bLtGPBd.png',
         superEffective: ['dragon'],
         notEffective: ['steel'],
         noEffect: ['fairy']
      },
      {
         name: 'dark',
         icon: 'https://i.imgur.com/WKe2jzh.png',
         superEffective: ['ghost', 'psychic'],
         notEffective: ['fighting', 'dark', 'fairy'],
         noEffect: []
      },
      {
         name: 'fairy',
         icon: 'https://i.imgur.com/39kDaMO.png',
         superEffective: ['fighting'],
         notEffective: ['poison', 'steel', 'fire'],
         noEffect: ['dragon', 'dark']
      }
   ]
};
