$(document).ready(initializeApp);


var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;
var hasDecimal = false;

function initializeApp() {
  $('.center').css('pointer-events', 'none'); //For testing only

  applyClickHandlers();
}

function applyClickHandlers() {
  $('#number-block').on('click', '.number', numberButtonHandler);

  $('#operator-column').on('click', '.operator', operatorButtonHandler);

  $('#equals').click(equalsButtonHandler);

  $('#decimal').click(decimalButtonHandler);

  $('#c-button').click(clearButtonHandler);

  $('#ac-button').click(allClearButtonHandler);

}

function numberButtonHandler(event) {
  var inputtedNumber = '';
  inputtedNumber = $(event.currentTarget).find('p').text();

  if (calculationResult !== null) {
    calculationResult = null;
    displayArray=[];
  }

  stringNumberToPush += inputtedNumber;
  displayArray.push(inputtedNumber);
  updateDisplay();
}

function operatorButtonHandler(event) {
  var inputtedOperator = '';
  hasDecimal = false;
  inputtedOperator = $(event.currentTarget).find('p').text();
  displayArray.push(inputtedOperator);
  updateDisplay();


  if (calculationResult !== null) {
    calculationArray.push(calculationResult);
  } else {
    calculationArray.push(stringNumberToPush);
  }
  calculationArray.push(inputtedOperator);

  stringNumberToPush = '';
  console.log(calculationArray);
}

function equalsButtonHandler(event) {
  var answer = null;
  hasDecimal = false;
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];



  if (calculationResult !== null) {
    answer = calculate(calculationResult[0], calculationArray[calculationArray.length-1], calculationArray[calculationArray.length-2]);
  } else {
    answer = calculate(calculationArray[0], calculationArray[calculationArray.length-1], calculationArray[calculationArray.length - 2]);
  }

  displayArray.push(answer);
  updateDisplay();
  calculationArray = [];
}

function updateDisplay() {
  var displayText = displayArray.join('');

  $('#display-text').text(displayText);
}

function calculate(num1, num2, operator=0) {
  var number1 = parseFloat(num1);
  var number2 = parseFloat(num2);
  var result = null;

  switch (operator) {
    case 0:
      result = number1;
      break;
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
      console.log(`I can't compute this!`)
      break;
  }

  if (isNaN(result)) {
    result = number1;
  }

  if (result === Infinity) {
    result = 'Error';
  }

  calculationResult = result;
  return result;
}

function decimalButtonHandler() {

  if (!hasDecimal) {
    var inputtedDecimal = $(event.currentTarget).find('p').text();
    stringNumberToPush += inputtedDecimal;
    displayArray.push(inputtedDecimal);

    console.log(stringNumberToPush);
    updateDisplay();
    hasDecimal = true;
  }
}


function clearButtonHandler() {
  displayArray = [];
  calculationArray = [];
  updateDisplay();
  hasDecimal = false;
}

function allClearButtonHandler() {
  displayArray = [];
  calculationArray = [];
  calculationResult = null;
  updateDisplay();
  hasDecimal = false;
}
