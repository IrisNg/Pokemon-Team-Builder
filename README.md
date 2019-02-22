# Pokemon Team Builder
A simple app to analyze your Pokémons' strengths and weaknesses!
You can select up to 6 Pokémons (from the Pokédex at the bottom), and this app will let you know which types each Pokémon is strong / weak / has no effect against.
This app also exposes your Pokémon Team's overall strengths and weaknesses.

### If you play Pokémon: 
You can use this app to plan your ideal Pokémon team worthy of challenging the Elite Four. The ultimate goal is to have a balanced team that is capable of dealing super effective damages to every of the 18 types in the game. 
(At least, that is how I personally approach any Pokémon game - switching out the right Pokémon each turn that can one-shot or two-shot the opponent). You might want to take a screenshot of your Pokémon Team cards and analysis table so that you can refer to it while playing the game.
You can also pick your dream Pokémon Team based on aesthetics- if you have a preference for cute-looking or Dragon-type Pokémons, the filter feature is something you will want to use. Then use the analysis given to tweak your team and achieve a perfect balance of form vs function. After all, you are going to need some help to beat the game based on looks alone!
The Pokédex to choose from contains 649 Pokémons, up to generation Black 2 / White 2. 

### If you have no idea what Pokémon is:
Think 'Rock Paper Scissors', but more intense and complex. 'Rock Paper Scissors' game has 3 types and it is enough to keep you and your opponent guessing. Imagine managing 18 types with 6 Pokémons! How can anyone play Pokémon without some serious memory skills?!

## Features

* Collection of 649 Pokémon thumbnails, IDs and Names - build a database using looped API calls to Pokémon API
* Clickable and Selectable Pokémons - show more details when selected
* Analysis Table - computed by cross referencing each chosen Pokémon's types with a Pokémon type chart [like this one](https://rankedboost.com/pokemon-lets-go/type-chart/) 
* Analysis Summary - further boil down the analysis table into a summary message to indicate the Pokémon team's greatest weakness or strength 
* Filter Bar - to only show Pokémons that meet a certain criteria (eg. by type, game version, trade evolution) or change the order they are sorted by 

## Technologies Used

* EJS
* Javascript (Alot) - Data structures to store fetched API data 
* JQuery - EventHandlers for displaying, hiding, appending and styling elements when clicked
* Semantic UI - Basic element styling and grid
* HTML 
* CSS - Box model, font styling, web responsiveness
* Node.JS & Express - making requests to Pokémon API
* Mongo DB - for storing seed documents concocted from fetched Pokémon API data and chart to cross-reference types

## Important Files
* Server file - /app.js
* EJS (html) file - /views/index.ejs
* Javascript file - /public/js/main.js
* CSS file - /public/stylesheets/main.css
* Reference for the various data structures used - /reference/MainJS data structure reference.txt

## Struggle Zones (AKA challenges that made me got smacked around by the technologies I used)

* Looping hundreds of API calls and performing a crud operation at the end of the loop 
  - Used setTimeout here because my knowledge on the topic of asynchronous Javascript was weak. 
  - Possible solutions include using for...of loop, async await, or promises. 
* Parse data from server-side to ejs and into the imported javascript file
* Plan FAR ahead on how to organize data structures in a coherent manner so that the values inside can be extracted appropriately 
  - Use array for data that needs to be iterated over and object to call a value by its key. Clear enough logic, but when there is alot of cross referencing of values from various variables happening it turned into a mess very quickly (i.e. using for...in to loop through object keys) 
  - Please refer to evidence /reference/MainJS data structure reference.txt to see how complicated nesting of multiple data structures became.
* Extracting above mentioned data structures into table form 
  - Different algorithm has to be used when displaying the data using html table or using semantic UI's grid system.
* Javascript methods including ES2015 (filter, map, sort, forEach, for ...in, reduce, join, for loop, some ) are immensely helpful!
* Using JQuery selectors and methods the right way ('.parent()' '.children()' '.wrap()')
  - Visualize how to traverse through the DOM tree to select the element you want 
  - Binding to make sure clicking the close button on the 2nd Pokémon removes the correct 2nd Pokémon entry from the array, while maintaining the positioning of the rest of the Pokémon entries in the array -> the 3rd Pokémon entry should not shift forward to occupy the removed entry    
* Customizing Semantic UI is really difficult, the nested grid system classes are very difficult to select and modify using CSS, such as doing minor alignment using padding or changing the grid layout for mobile view.
  - Avoid Semantic unless the design of the page is really straight forward. Learn vanilla CSS properly, kids.
* Consider scenarios in conditional statements very carefully. 
  - It is make or break! Understand when to use if-if, if-else if-else, and nested conditional statements.
* Deep copying vs Referencing 
* Input checkboxes, radio buttons, dropdowns 
  - Using the values inputted in Javascript with DOM 
* Web responsiveness

## Installation Instructions

### Prerequisites
Make sure you have Node.JS and Mongo DB installed locally

### Dependencies
* ejs
* express
* mongoose
* request
* request-promise

### Steps

1. Clone the repository to any of your local folder

2. Install the following dependencies to the main project folder (i.e. C:/.../Pokemon-Team-Builder-master) by running the following command in your terminal
```
npm install ejs express mongoose request request-promise --save
```

3. Start the server using the following command in your terminal (make sure your local mongoDB is running beforehand!)
```
node app.js 
```

4. Seed the necessary documents into mongoDB by going to the following URLS one after another in your browser, these are GET routes that Create documents in your local MongoDB

* http://localhost:5000/types/new
* http://localhost:5000/table/new
* http://localhost:5000/generate

You might have to wait a minute or two after the last one. 

5. All set up! In your browser, go to 'http://localhost:5000/', the app should be up and running!

## Contributors

Created by Iris Ng. 
Feel free to hit me up with those bug reports or places where my code can use some improvement :) thanks!
