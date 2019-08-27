$(document).ready(initializeApp);


var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;
var hasDecimal = false;
var hasOperator = false;
var operatorList = '/+-*';

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

  hasOperator = false;
  stringNumberToPush += inputtedNumber;
  displayArray.push(inputtedNumber);
  updateDisplay();
}

function operatorButtonHandler(event) {

  if (operatorList.includes(displayArray[displayArray.length-1])) {
    displayArray.splice(displayArray.length-1, 1);
  }
  var inputtedOperator = '';
  inputtedOperator = $(event.currentTarget).find('p').text();
  displayArray.push(inputtedOperator);
  updateDisplay();
  console.log('display array', displayArray);


  if (calculationResult !== null) {
    calculationArray.push(calculationResult);
  } else {
    calculationArray.push(stringNumberToPush);
  }
  calculationArray.push(inputtedOperator);

  if (calculationArray.length > 2) {
    calculationArray.splice(1, 2);
  }

  stringNumberToPush = '';
  hasOperator = true;
  console.log('calculation array', calculationArray)
}

function equalsButtonHandler(event) {

  var answer = null;
  hasDecimal = false;
  hasOperator = false;
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];
  console.log(calculationArray);



  if (calculationResult !== null) {
    calculationArray[0] = calculationResult;
    // answer = calculate(calculationResult, calculationArray[2], calculationArray[1]);
    answer = calculateArray(calculationArray);
  } else if (calculationArray[2] === '') {
    calculationArray[2] = calculationArray[0]
    // answer = calculate(calculationArray[0], calculationArray[0], calculationArray[1])
    answer = calculateArray(calculationArray);
  } else {
    // answer = calculate(calculationArray[0], calculationArray[2], calculationArray[1]);
    answer = calculateArray(calculationArray);
  }
  console.log(answer);
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

function calculateArray(array) {
  var arrayLength = array.length;

  while (arrayLength > 3) {
    for (var i = 0; i < array.length; i++) {
      arrayLength = array.length;
      if (array[i] === '*' || array[i] === '/') {
        array[i] = calculate(array[i - 1], array[i + 1], array[i]);
        array.splice(i + 1, 1);
        array.splice(i - 1, 1);
      }
    }
    for (var i = 0; i < array.length ; i++) {
      arrayLength = array.length;
      if (array[i] === '+' || array[i] === '/') {
        array[i] = calculate(array[i - 1], array[i + 1], array[i]);
        array.splice(i + 1, 1);
        array.splice(i - 1, 1);
      }
    }
  }
  console.log(array);
  result = calculate(array[0], array[2], array[1]);
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
  hasOperator = false;
}

function allClearButtonHandler() {
  displayArray = [];
  calculationArray = [];
  calculationResult = null;
  updateDisplay();
  hasDecimal = false;
  hasOperator = false;
}

// var test = calculateArray(['1', '+', '3', '/', '4', '+', '10', '*', '2'])
// console.log(test);
