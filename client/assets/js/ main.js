$(document).ready(initializeApp);

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = '';
var calculationResult = null;
var hasDecimal = false;
var operatorList = '÷+-x';
var lastOperator = null;
var lastNumber = null;

function initializeApp() {

  applyClickHandlers();
}

function applyClickHandlers() {
  $('.number').click(numberButtonHandler);

  $('.operator').click(operatorButtonHandler);

  $('#equals').click(equalsButtonHandler);

  $('#decimal').click(decimalButtonHandler);

  $('#ac-button').click(allClearButtonHandler);

  $('#oppositeSign').click(oppositeSignHandler);

  $('#percentage').click(percentageHandler);

  $('#moon').click(nightMode);

  $('#sun').click(dayMode);

}

function numberButtonHandler(event) {
  var inputtedNumber = '';

  inputtedNumber = $(event.currentTarget).text();

  if (calculationResult !== null) {
    calculationResult = null;
    if (!operatorList.includes(displayArray[displayArray.length-1]) && displayArray[displayArray.length-1] !== '.') {
      displayArray = [];
    }
  }

  stringNumberToPush += inputtedNumber;
  displayArray.push(inputtedNumber);

  updateDisplay();
}

function operatorButtonHandler(event) {
  var inputtedOperator = '';

  inputtedOperator = $(event.currentTarget).text();

  if (operatorList.includes(displayArray[displayArray.length-1])) {
    displayArray.pop()
    calculationArray[1] = inputtedOperator;
  } else {
    if (calculationResult !== null) {
      calculationArray.push(calculationResult);
    } else {
      calculationArray.push(stringNumberToPush);
    }
    calculationArray.push(inputtedOperator);
  }

  displayArray.push(inputtedOperator);
  updateDisplay();

  stringNumberToPush = '';
  hasDecimal = false;
}

function equalsButtonHandler(event) {
  var answer = null;
  hasDecimal = false;
  calculationArray.push(stringNumberToPush);
  stringNumberToPush = '';
  displayArray = [];

  if (calculationArray[0] === '' && calculationArray.length === 1) {
    if (calculationResult === null) {
      calculationArray[0] = 0;
      calculationArray[2] = 0;
    } else {
      calculationArray[0] = calculationResult;
      calculationArray[1] = lastOperator;
      calculationArray[2] = lastNumber;
    }
  }

  if (calculationArray[0] === '' && calculationArray[2] === '' || calculationArray[0] === '.' && calculationArray[2] === '.' || calculationArray[0] === '.' && calculationArray[calculationArray.length-1] === '') {
    calculationArray[0] = 0;
    calculationArray[2] = 0;
  } else if (calculationArray[calculationArray.length-1] === '') {
    var tempAnswer = calculateArray(calculationArray.splice(0, calculationArray.length - 2));
    calculationArray.splice(0, calculationArray.length-2, tempAnswer);
    calculationArray[calculationArray.length-1] = tempAnswer;
  } else if (calculationArray[0] === '' || calculationArray[0] === '.' || calculationArray[0] === 'Error'){
    calculationArray[0] = 0;
  } else if (calculationResult !== null) {
    calculationArray[0] = calculationResult;
  }

  lastOperator = calculationArray[1];
  lastNumber = calculationArray[2];
  answer = calculateArray(calculationArray);

  displayArray.push(answer);
  updateDisplay();
  calculationArray = [];
}

function updateDisplay() {
  var displayText = displayArray.join('');

  if (displayText.length > 0) {
    $('.ac').text('C');
  } else {
    $('.ac').text('AC');
  }

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
    case 'x':
      result = number1 * number2;
      break;
    case '÷':
      result = number1 / number2;
      break;
    default:
      result = 0;
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
      if (array[i] === 'x' || array[i] === '÷') {
        array[i] = calculate(array[i - 1], array[i + 1], array[i]);
        array.splice(i + 1, 1);
        array.splice(i - 1, 1);
      }
    }

    for (var i = 0; i < array.length ; i++) {
      arrayLength = array.length;
      if (array[i] === '+' || array[i] === '-') {
        array[i] = calculate(array[i - 1], array[i + 1], array[i]);
        array.splice(i + 1, 1);
        array.splice(i - 1, 1);
      }
    }
  }

  result = calculate(array[0], array[2], array[1]);
  return result;
}

function decimalButtonHandler() {

  if (!hasDecimal) {
    var inputtedDecimal = $(event.currentTarget).text();
    stringNumberToPush += inputtedDecimal;
    displayArray.push(inputtedDecimal);
    updateDisplay();
    hasDecimal = true;
  }
}

function allClearButtonHandler() {
  if (displayArray.length === 0) {
    calculationResult = null;
  }
  displayArray = [];
  calculationArray = [];
  updateDisplay();
  hasDecimal = false;
  stringNumberToPush = '';
}

function oppositeSignHandler() {
  var currentNum;

  if (isNaN(displayArray[displayArray.length - 1])) {
    return;
  }

  if (displayArray.length === 0 || displayArray[0] === '.') {
    currentNum = 0;
  } else if (operatorList.includes(displayArray[0])) {
    currentNum = parseInt(displayArray.splice(1))*-1;
  } else if (calculationResult !== null) {
    currentNum = calculationResult*-1
  } else {
    currentNum = parseInt(displayArray.join('')) * -1;
  }


  displayArray.splice(0, displayArray.length, currentNum);
  stringNumberToPush = currentNum;
  calculationResult = currentNum;
  updateDisplay();
}

function percentageHandler() {
  console.log(calculationArray);
  console.log(displayArray);
  var percentageNum;


  if (isNaN(displayArray[displayArray.length-1])) {
    return;
  }

  if (displayArray.length === 0 || displayArray[0] === '.') {
    percentageNum = 0;
  } else if (operatorList.includes(displayArray[0])) {
    percentageNum = parseInt(displayArray.splice(1)) / 100;
  } else if (calculationResult !== null) {
    percentageNum = calculationResult/100;
  } else {
    percentageNum = parseInt(displayArray.join('')) / 100;
  }


  displayArray.splice(0, displayArray.length, percentageNum);
  stringNumberToPush = percentageNum;
  calculationResult = percentageNum;
  updateDisplay();
}

function nightMode() {
  $('ion-icon').addClass('colorBlack');
  $('.screen__Name').addClass('colorBlack');
  $('.main').addClass('backgroundBlack').addClass('colorWhite');
  $('.calculator__Button').addClass('buttonBlack');
  $('.operator').addClass('buttonOrange');
  $('.equals').addClass('buttonOrange');
  $('.screen__Container-text').addClass('colorOrange');
}

function dayMode() {
  $('ion-icon').removeClass('colorBlack');
  $('.screen__Name').removeClass('colorBlack');
  $('.main').removeClass('backgroundBlack').removeClass('colorWhite');
  $('.calculator__Button').removeClass('buttonBlack');
  $('.operator').removeClass('buttonOrange');
  $('.equals').removeClass('buttonOrange');
  $('.screen__Container-text').removeClass('colorOrange');
}
