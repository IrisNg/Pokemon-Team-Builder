//delete unnecessary keys from mongoDB
delete protoTable._id;
delete protoTable.__v;
//To copy an instance of the full nPokedex later
var pokedex = nPokedex;
// Variable to hold the filter preferences set by the user
var requirement;
//Empty array that will contain the IDs of the pokemons picked by the user (max 6)
var selectedPokemons = [];
//Empty array that will contain the entries of the pokemons picked by the user
var team;
//Empty array that will contain the collective types of the pokemons picked by the user
var teamTypes;
//Empty array that will contain the entries of the pokemons' types
var teamTypesEntries;
//To copy an instance of the protoTable object later (AKA deep copy method on the web, not reference)
var table;

//Add eventListeners to all pokemon thumbnails that when triggered will add selected pokemon to the team
addThumbnailListener();

//Buttons that checks or unchecks all types in filter
$('#uncheck').click(function() {
   $('#types-checkbox input').prop('checked', false);
});
$('#check').click(function() {
   $('#types-checkbox input').prop('checked', true);
});
// Clicking reload button on the filter form will trigger filterAndSort function
$('#filter-submit').click(function(e) {
   e.preventDefault();
   //Filling the requirement variable with the preferences set by the user
   requirement = {};
   requirement.sort = $('#sort').val();
   requirement.evolveByTrade = $("input[name='evolve']:checked").val() == 'true';
   requirement.version = null;
   requirement.types = [];
   if ($('#version').val() !== 'all') {
      requirement.version = $('#version').val();
   }
   $('#types-checkbox input:checked').each(function() {
      requirement.types.push($(this).val());
   });
   filterAndSort();
});

//Add eventListeners to all pokemon thumbnails that when triggered will add selected pokemon to the team
function addThumbnailListener() {
   //Adding eventlisteners to each pokemon thumbnail so that we know which pokemon gets picked by user
   $('.thumbnail').click(function() {
      //Checking for empty slot in the existing array
      var emptySlot = selectedPokemons.indexOf(null);
      //If no vacated slot then add to new one
      if (emptySlot === -1 && selectedPokemons.length < 6) {
         //Overwriting the context of "this"
         //Id of the chosen pokemon will be added to the selectedPokemon array if it is not full
         selectedPokemons.push($('span', this).text());
      }
      //Slot in the newly selected pokemon's id into the existing array if there is an empty spot
      if (emptySlot > -1) {
         selectedPokemons[emptySlot] = $('span', this).text();
      }
      //Turn the array of IDs to an array of selected Pokemons' entries
      conversionsAndCalculations();
      //Make the selected pokemons show up as thumbnails
      addMember();
   });
}

//To filter the pokemon thumbnails that are displayed based on filter preferences
function filterAndSort() {
   //Copy an instance of the full pokedex before filtering
   pokedex = nPokedex;

   //Lesson - cannot use switch statement here, criteria assessment uses triple equals (strict equals)
   //If the user wants to filter by 'types'
   if (requirement.types) {
      pokedex = pokedex.filter(pokemon => {
         //check if this pokemon's type 1 or type 2 matches any(or more) of the type requirements set by the user
         return requirement.types.some(type => {
            //if there is any one match, it is enough for the pokemon to pass the filter test
            return pokemon.types.type1 === type || pokemon.types.type2 === type;
         });
      });
   }
   //If the user wants to filter by 'version' (user can only choose 1 version or all)
   if (requirement.version) {
      pokedex = pokedex.filter(pokemon => {
         return pokemon.versions.includes(requirement.version);
      });
   }
   //If the user wants to exclude pokemons that evolve by trade #users with no friends to trade with
   if (!requirement.evolveByTrade) {
      pokedex = pokedex.filter(function(pokemon) {
         return !pokemon.evolveByTrade;
      });
   }
   //Sort the filtered results by pokemons' id number
   if (requirement.sort === 'id') {
      pokedex.sort(function(a, b) {
         if (a.id < b.id) {
            return -1;
         }
         if (a.id > b.id) {
            return 1;
         }
         return 0;
      });
   } else if (requirement.sort === 'a-z') {
      //Sort the filtered results by pokemons' names, in alphabetical order
      pokedex.sort(function(a, b) {
         if (a.name < b.name) {
            return -1;
         }
         if (a.name > b.name) {
            return 1;
         }
         return 0;
      });
   }
   //Display the filtered pokedex
   filterPokedex();
}
//Display the filtered pokedex
function filterPokedex() {
   //Remove all existing pokemon thumbnails that are being displayed
   $('.thumbnails').html('');
   //Add in the pokemon thumbnails that survived the filtering process
   pokedex.forEach(pokemon => {
      $('.thumbnails').append(`
        <div class='center aligned column'>
            <div class='ui card thumbnail'>
                <div class='image'><img src='${pokemon.image}' /></div>
                <div class='description'>
                    <strong>#</strong><span>${pokemon.id}</span>
                    <div class='pokemon-name'>${pokemon.name}</div>
                </div>
            </div>
        </div>
    `);
   });
   //Add back in the event handlers for clicking the thumbnails
   addThumbnailListener();
}

function conversionsAndCalculations() {
   //Empty out previous arrays
   team = [];
   teamTypes = [];
   teamTypesEntries = [];

   //Turn the array of IDs (selectedPokemons) to an array of selected Pokemons' entries (team)
   team = selectedPokemons.map(selected => {
      //Finding the pokemon entry from the pokedex based on the Id in the selectedPokemon array
      //Because the Id in the selectedPokemon array is a string, it has to be parsed into Number
      return pokedex.find(pokemon => pokemon.id === parseInt(selected, 10));
   });

   //Making a collective array of all selected pokemons' types
   teamTypes = team.map(pokemon => {
      if (!pokemon) {
         return null;
      }
      return {
         type1: pokemon.types.type1.toUpperCase(),
         type2: pokemon.types.type2 ? pokemon.types.type2.toUpperCase() : null
      };
   });
   //Turning this collective array of selected pokemons' types into full entries
   teamTypesEntries = teamTypes.map(pokemon => {
      if (!pokemon) {
         return null;
      }
      return {
         type1: types.find(type => {
            return type.name === pokemon.type1;
         }),
         type2: types.find(type => {
            return type.name === pokemon.type2;
         })
      };
   });
   analysisTable();
}

//Make the selected pokemons show up as thumbnails
function addMember() {
   for (var i = 0; i < 6; i++) {
      //Per team member's thumbnail
      if (selectedPokemons[i]) {
         //Add description and closing icon
         $(`.chosen:eq(${i}) .description`).html(`<span>#${team[i].id}</span> ${team[i].name}`);
         $(`.chosen:eq(${i}) .description`).append("<i class='close icon'></i>");
         //Add pokemon image
         $(`.chosen:eq(${i}) img`).attr('src', team[i].image);
         //Add eventListener to each existing closing icon that will remove said team member when clicked
         $(`.chosen:eq(${i}) .close.icon`).click(removeMember.bind(null, i));

         //Adding type icons
         $(`.type-one:eq(${i})`).text(teamTypesEntries[i].type1.name);
         if (teamTypes[i].type2) {
            $(`.type-two:eq(${i})`).text(teamTypesEntries[i].type2.name);
         }
         //Adding super-effective icons
         $(`.super-effective:eq(${i})`).text('super-effective against');
         $(`.super-effective-one:eq(${i})`).text(teamTypesEntries[i].type1.superEffective.join(' '));
         //Adding Not-very-effective icons
         $(`.not-effective:eq(${i})`).text('not-very-effective against');
         $(`.not-effective-one:eq(${i})`).text(teamTypesEntries[i].type1.notEffective.join(' '));
         //Adding No-effect icons
         $(`.no-effect:eq(${i})`).text('no-effect against');
         $(`.no-effect-one:eq(${i})`).text(teamTypesEntries[i].type1.noEffect.join(' '));
         //Same for type 2, if it exists
         if (teamTypes[i].type2) {
            $(`.super-effective-two:eq(${i})`).text(teamTypesEntries[i].type2.superEffective.join(' '));
            $(`.not-effective-two:eq(${i})`).text(teamTypesEntries[i].type2.notEffective.join(' '));
            $(`.no-effect-two:eq(${i})`).text(teamTypesEntries[i].type2.noEffect.join(' '));
         }
         //Additional styling
         $(`.team:eq(${i}) .segment`).css({ backgroundColor: teamTypesEntries[i].type1.color, border: 'none' });
         $(`.chosen:eq(${i})`).css('border', 'none');
         if (teamTypes[i].type2) {
            $(`.type-two:eq(${i})`).addClass('type-icon');
            $(`.type-two:eq(${i})`).css('color', teamTypesEntries[i].type2.color);
            $(`.team:eq(${i}) .segment`).css({
               backgroundImage: `linear-gradient(to bottom right, ${teamTypesEntries[i].type1.color},${
                  teamTypesEntries[i].type2.color
               })`,
               border: 'none'
            });
         }
         $(`.type-one:eq(${i})`).addClass('type-icon');
         $(`.type-one:eq(${i})`).css('color', teamTypesEntries[i].type1.color);
      }
   }
}

//Callback attached to closing icon's event listener that will remove selected pokemon from team
function removeMember(index) {
   //Remove this pokemon from the selectedPokemons array according to the index passed in
   //Retain the indexes of other remaining team members using null
   selectedPokemons[index] = null;
   //Update the team's pokemon entries to reflect this removal
   conversionsAndCalculations();
   //Remove this team pokemon's closing icon and its eventListener
   $(`.chosen:eq(${index}) .description .close.icon`).remove();
   //Remove this team pokemon's name
   $(`.chosen:eq(${index}) .description`).html('');
   //Change back this team pokemon's image to the default
   $(`.chosen:eq(${index}) img`).attr(
      'src',
      'https://pm1.narvii.com/6508/dbd421799e1fc9118c02766e5c13836c87db6070_hq.jpg'
   );

   //Remove added styling
   $(`.ui.grid.team-member:eq(${index}) .details`)
      .find('.type-one,.type-two,h5,p')
      .text('');
   $(`.team:eq(${index}) .ui.segment`).css({
      background: 'none',
      backgroundColor: 'white',
      border: '1px solid rgba(34, 36, 38, 0.15)'
   });
   $(`.chosen:eq(${index})`).css('border', '2px solid black');
   $(`.type-one:eq(${index})`).removeClass('type-icon');
   $(`.type-two:eq(${index})`).removeClass('type-icon');
}

//Function that manages the Analysis Table
function analysisTable() {
   //Start from fresh table always (using deep copy method to avoid referencing)
   table = JSON.parse(JSON.stringify(protoTable));

   // //Remove previous existing rows and header
   $('.table-header div').remove();

   //Only do the necessary calculations and display the Analysis Table when there is more than one pokemon
   if (selectedPokemons.length > 0) {
      function addNameToTableType(effect) {
         //Add the pokemon's name to the type that it does super-effective/not-very-effective/no-effect damage to
         teamTypesEntries[i].type1[effect].forEach(toType => {
            table[toType.toLowerCase()][effect].push(team[i].name);
         });
         //Add the pokemon's name to the type that it does super-effective/not-very-effective/no-effect damage to based on the pokemon's 2nd type
         if (teamTypes[i].type2) {
            teamTypesEntries[i].type2[effect].forEach(toType => {
               table[toType.toLowerCase()][effect].push(team[i].name);
            });
         }
      }
      // Analysis Table - Creating object
      for (var i = 0; i < 6; i++) {
         //Do this for each pokemon that has been selected
         if (selectedPokemons[i]) {
            //Add the pokemon's name to the table type that it does super-effective damage to
            addNameToTableType('superEffective');
            //Add the pokemon's name to the table type that it does not-very-effective damage to
            addNameToTableType('notEffective');
            //Add the pokemon's name to the table type that it does no-effect damage to
            addNameToTableType('noEffect');
         }
      }

      //Adding table header & pokemons to the analysis table
      for (tableType in table) {
         //Adding pokemon names as cells
         var SEpokemons = table[tableType]['superEffective'].map(
            pokemon => `<div class='table-super-effective table-pokemon'>${pokemon}</div>`
         );
         var NVEpokemons = table[tableType]['notEffective'].map(
            pokemon => `<div class='table-not-effective table-pokemon'>${pokemon}</div>`
         );
         var NEpokemons = table[tableType]['noEffect'].map(
            pokemon => `<div class='table-no-effect table-pokemon'>${pokemon}</div>`
         );
         //Stringing the html generated into one continuous string of HTML
         var allPokemonHTML = SEpokemons.concat(NVEpokemons)
            .concat(NEpokemons)
            .join('');

         //Each header row of the table will have 9 / 4 / 1 types depending on the window size
         //Adding the type-name as header and the pokemon names under the respective type header
         $('.ui.grid.analysis-table .table-header').append(
            `<div class='column table-column'>
               <div class='table-type'>
                  ${tableType.toUpperCase()}
               </div>
               ${allPokemonHTML}
            </div>`
         );
      }
   }
   analysisSummary();
}
var tableTypeEntry;
var recommended;
function analysisSummary() {
   for (tableType in table) {
      if (table[tableType].notEffective.length > 4 && table[tableType].superEffective.length < 2) {
         tableTypeEntry = types.filter(typeEntry => typeEntry.superEffective.includes(table[tableType].typeName));
         //remove same type immunity/ineffectiveness

         recommended = tableTypeEntry.map(entry => entry.name);
         $('.table-summary').append(
            `Your team is overwhelmingly weak to ${
               table[tableType].typeName
            } type! It is recommended that you switch out either blah blah blah to some ${recommended.join(
               ' or '
            )} pokemon`
         );
      }
   }
}
