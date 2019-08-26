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
}

function equalsButtonHandler(event) {
  var answer = null;
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];

  answer = calculate(calculationArray[0], calculationArray[2], calculationArray[1]);
  displayArray.push(answer);
  updateDisplay();

}

function updateDisplay() {
  var displayText = displayArray.join('');

  $('#display-text').text(displayText);
}

function calculate(num1, num2, operator) {
  var number1 = parseFloat(num1);
  var number2 = parseFloat(num2);
  var result = null;

  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
    default:
      console.log('I can\'t compute this!')
  }
  return result;
}
