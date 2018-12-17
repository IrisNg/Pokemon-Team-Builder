module.exports = {
   types: [
      {
         name: 'NORMAL',
         icon: 'https://i.imgur.com/T8MOm7P.png',
         color: '#a8a878',
         superEffective: [],
         notEffective: ['ROCK', 'STEEL'],
         noEffect: ['GHOST']
      },
      {
         name: 'FIGHTING',
         icon: 'https://i.imgur.com/Pr97GQ1.png',
         color: '#c03028',
         superEffective: ['NORMAL', 'ROCK', 'STEEL', 'ICE', 'DARK'],
         notEffective: ['FLYING', 'POISON', 'BUG', 'PSYCHIC', 'FAIRY'],
         noEffect: ['GHOST']
      },
      {
         name: 'FLYING',
         icon: 'https://i.imgur.com/ZO54bmh.png',
         color: '#a890f0',
         superEffective: ['FIGHTING', 'BUG', 'GRASS'],
         notEffective: ['ROCK', 'STEEL', 'ELECTRIC'],
         noEffect: []
      },
      {
         name: 'POISON',
         icon: 'https://i.imgur.com/Hh7FDun.png',
         color: '#a040a0',
         superEffective: ['GRASS', 'FAIRY'],
         notEffective: ['POISON', 'GROUND', 'ROCK', 'GHOST'],
         noEffect: ['STEEL']
      },
      {
         name: 'GROUND',
         icon: 'https://i.imgur.com/Z8AVJ4a.png',
         color: '#e0c068',
         superEffective: ['POISON', 'ROCK', 'STEEL', 'FIRE', 'ELECTRIC'],
         notEffective: ['BUG', 'GRASS'],
         noEffect: ['FLYING']
      },
      {
         name: 'ROCK',
         icon: 'https://i.imgur.com/8fuHs1C.png',
         color: '#b8a038',
         superEffective: ['FLYING', 'BUG', 'FIRE', 'ICE'],
         notEffective: ['FIGHTING', 'GROUND', 'STEEL'],
         noEffect: []
      },
      {
         name: 'BUG',
         icon: 'https://i.imgur.com/kpru1Y8.png',
         color: '#a8b820',
         superEffective: ['GRASS', 'PSYCHIC', 'DARK'],
         notEffective: ['FIGHTING', 'FLYING', 'POISON', 'GHOST', 'STEEL', 'FIRE', 'FAIRY'],
         noEffect: []
      },
      {
         name: 'GHOST',
         icon: 'https://i.imgur.com/UroikHx.png',
         color: '#705898',
         superEffective: ['GHOST', 'PSYCHIC'],
         notEffective: ['DARK'],
         noEffect: ['NORMAL']
      },
      {
         name: 'STEEL',
         icon: 'https://i.imgur.com/lmN1qDy.png',
         color: '#b8b8d0',
         superEffective: ['ROCK', 'ICE', 'FAIRY'],
         notEffective: ['STEEL', 'FIRE', 'WATER', 'ELECTRIC'],
         noEffect: []
      },
      {
         name: 'FIRE',
         icon: 'https://i.imgur.com/ChmQPRq.png',
         color: '#f08030',
         superEffective: ['BUG', 'STEEL', 'GRASS', 'ICE'],
         notEffective: ['ROCK', 'FIRE', 'WATER', 'DRAGON'],
         noEffect: []
      },
      {
         name: 'WATER',
         icon: 'https://i.imgur.com/OYx24YT.png',
         color: '#6890f0',
         superEffective: ['GROUND', 'ROCK', 'FIRE'],
         notEffective: ['WATER', 'GRASS', 'DRAGON'],
         noEffect: []
      },
      {
         name: 'GRASS',
         icon: 'https://i.imgur.com/h0mdNN0.png',
         color: '#78c850',
         superEffective: ['GROUND', 'ROCK', 'WATER'],
         notEffective: ['FLYING', 'POISON', 'BUG', 'STEEL', 'FIRE', 'GRASS', 'DRAGON'],
         noEffect: []
      },
      {
         name: 'ELECTRIC',
         icon: 'https://i.imgur.com/nZbIwgv.png',
         color: '#f8d030',
         superEffective: ['FLYING', 'WATER'],
         notEffective: ['GRASS', 'ELECTRIC', 'DRAGON'],
         noEffect: ['GROUND']
      },
      {
         name: 'PSYCHIC',
         icon: 'https://i.imgur.com/b7EgqXU.png',
         color: '#f85888',
         superEffective: ['FIGHTING', 'POISON'],
         notEffective: ['STEEL', 'PSYCHIC'],
         noEffect: ['DARK']
      },
      {
         name: 'ICE',
         icon: 'https://i.imgur.com/Adij2NC.png',
         color: '#98d8d8',
         superEffective: ['FLYING', 'GROUND', 'GRASS', 'DRAGON'],
         notEffective: ['STEEL', 'FIRE', 'WATER', 'ICE'],
         noEffect: []
      },
      {
         name: 'DRAGON',
         icon: 'https://i.imgur.com/bLtGPBd.png',
         color: '#7038f8',
         superEffective: ['DRAGON'],
         notEffective: ['STEEL'],
         noEffect: ['FAIRY']
      },
      {
         name: 'DARK',
         icon: 'https://i.imgur.com/WKe2jzh.png',
         color: '#705848',
         superEffective: ['GHOST', 'PSYCHIC'],
         notEffective: ['FIGHTING', 'DARK', 'FAIRY'],
         noEffect: []
      },
      {
         name: 'FAIRY',
         icon: 'https://i.imgur.com/39kDaMO.png',
         color: '#dea5de',
         superEffective: ['FIGHTING'],
         notEffective: ['POISON', 'STEEL', 'FIRE'],
         noEffect: ['DRAGON', 'DARK']
      }
   ]
};
