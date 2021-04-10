
const display = document.querySelector('.calculator-input'); // sayıların gösterilmesi.
const keys = document.querySelector('.calculator-keys');

let displayValue = "0"; //ekrana başlangıçta 0 yazıyoruz.

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();
 
function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button'))  return;

    switch(value) { // aşağıdaki if'leri switch case' e aracılığıyla tekrar yaptık.

        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    
    }
    updateDisplay(); //ekran üzerinde görmek için.


    /*
    if (element.classList.contains('operator')) { //operatör mü diye kontrol ediyoruz.
        //console.log('operator', element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains('decimal')) { //nokta mı diye kontrol ediyoruz.
        //console.log('decimal', element.value);
        inputDecimal();
        updateDisplay();
        return;
    }

    if (element.classList.contains('clear')) { //clear butonu mu diye kontrol ediyoruz.
        //console.log('clear', element.value);
        clear();
        updateDisplay();
        return;
    }
        
   //console.log('number', element.value);
   
   inputNumber(element.value);
   updateDisplay(); //ekran üzerinde görmek için.
   */

});


function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {

        firstValue = value;

    } else if (operator) {

        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`; //7 basamakla sınırlandırıyrouz.
        firstValue = result;
    }

    waitingForSecondValue = true; //bir operatöre tıklandıktan sonra ikinci sayıyı beklediğimizi söylüyoruz.
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}


    function calculate(first, second, operator) { //hesaplamalar.
    if (operator === '+') {

        return first + second;

    } else if (operator === '-') {

        return first - second;

    } else if (operator === '*') {
        
        return first * second;

    } else if (operator === '/') {
        
        return first / second;

    }

    return second; //operatorler uymuyorsa ikinci sayıyı geri gönderiyoruz.
}


function inputNumber(num) {

    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
   console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) { //daha önce noktaya basılmamışsa noktaya baıldığında nokta ekle diyoruz. nokta içerip içermediğini kontrol eder.
        displayValue += '.';
    }  
}

function clear() {
    displayValue = '0';
}