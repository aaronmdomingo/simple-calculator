$(document).ready(initializeApp);


var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;

function initializeApp() {
  $('.center').css('pointer-events', 'none'); //For testing only

  applyClickHandlers();
}

function applyClickHandlers() {
  $('#number-block').on('click', '.number', numberButtonHandler);

  $('#operator-column').on('click', '.operator', operatorButtonHandler);

  $('#equals').click(equalsButtonHandler);
}

function numberButtonHandler(event) {
  var inputtedNumber = '';
  inputtedNumber = $(event.currentTarget).find('p').text();
  stringNumberToPush += inputtedNumber;

  displayArray.push(inputtedNumber);
  updateDisplay();
}

function operatorButtonHandler(event) {
  var inputtedOperator = '';
  inputtedOperator = $(event.currentTarget).find('p').text();
  displayArray.push(inputtedOperator);
  updateDisplay();

  calculationArray.push(stringNumberToPush);
  calculationArray.push(inputtedOperator);

  stringNumberToPush = '';
  console.log(calculationArray);
}

function equalsButtonHandler(event) {
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];
  console.log(calculationArray);
}

function updateDisplay() {
  var displayText = displayArray.join('');

  $('#display-text').text(displayText);
}
