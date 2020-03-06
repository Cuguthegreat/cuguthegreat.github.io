import * as backend from './services/backend-calls.js';
import * as entities from './state/entities.js';
import * as squares from './state/squares.js';
import * as battleMap from './view/battle-map.js';
import * as entityCreator from './view/entity-creator.js';
import * as socket from './services/socket-helper.js';
import * as multiSelect from './view/multi-select.js';
import * as features from './services/feature-flags.js';
import * as html from './services/html-helper.js';

export const initBattleMap = (entitiesData, squaresData) => {
    entities.setEntities(entitiesData);
    squares.setSquares(squaresData);
    battleMap.renderBattleMap();
    entityCreator.renderEntityCreator();
    // features.isTestEnv() && multiSelect.activateMultiSelect();
};

html.createHtmlElement({tagName: 'script', parent: document.head, attributes: {src: 'ressources/socket.io.js'}});

Promise.all([backend.read('entities'), backend.read('squares')]).then(
    ([entitiesData, squaresData]) => {
        initBattleMap(entitiesData, squaresData);
        socket.start();
    }
);

if (features.hasRatCounter()) {
html.createHtmlElement({tagName: 'p', id: "demo"});

// Set the date we're counting down to
var countDownDate = new Date("Mar 6, 2020 19:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = "Alles für die Ratte!" + "<br />" + "Alles für den Club!" + "<br />" +
  "Unser Leben für den Nager!" + "<br />" + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
}
