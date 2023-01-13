
// Right answers array

var rightAnswers = [
    "правила CSS, які дозволяють керувати стилями елементів залежно від значень технічних параметрів пристроїв",
    "гумова верстка",
    "брейкпоінт",
    "набір горизонтальних та вертикальних grid-ліній, що перетинаються",
    "ці ключові слова говорять браузеру переносити елементи на новий рядок, якщо не вистачає ширини, щоб вмістити їх без перекриття",
    [ 'застосування гнучкого макета на основі сітки',
      'робота з медіа-запитами',
      'використання гнучких зображень'],
    [ 'grid-контейнер є зручним для роботи з двома осями',
      'grid-елементи можуть використовуватись для адаптації сайту',
      'відступи між комірками гріда можна задати комбінованою властивістю'],
    "grid-template-columns: 1fr 3fr;",
    "8,3%"  
];

// Main function

function getScore() {

    //radio

    var counter = 0;

    for (var i = 1; i < 6; i++) {

        var radios = document.getElementsByName('variant' + i);

        for (var radio of radios) {
            if(radio.checked && radio.nextElementSibling.innerHTML == rightAnswers[i-1]) {
                radio.parentElement.style.backgroundColor = "rgb(33, 214, 33)";
                counter++;
            }
            else if (radio.checked && radio.nextElementSibling.innerHTML != rightAnswers[i-1]) {
                radio.parentElement.style.backgroundColor = "red";
            }
        }
    }

    //checkbox

    var k = 1;
    var counter2 = 0;

    for (i = 6; i < 8; i++) {

        var checkboxes = document.getElementsByName('check' + k++);

        for (var checks of checkboxes) {
            for(var j = 0; j < 3; j++) {
                if(checks.checked && checks.nextElementSibling.innerHTML == rightAnswers[i-1][j]) {
                    checks.parentElement.style.backgroundColor = "rgb(33, 214, 33)";
                    counter2+=0.5;
                }
                else if (checks.checked == false && checks.nextElementSibling.innerHTML == rightAnswers[i-1][j]) {
                    checks.parentElement.parentElement.parentElement.style.backgroundColor = "orange";
                }
                else if (checks.checked && checks.parentElement.style.backgroundColor != "rgb(33, 214, 33)") {
                    checks.parentElement.style.backgroundColor = "red";
                }
                else if (checks.checked == false && (checks.parentElement.style.backgroundColor == "red" || checks.parentElement.style.backgroundColor == "rgb(33, 214, 33)")) {
                    checks.parentElement.style.background = "none";
                }
            }
            if(checks.checked && checks.parentElement.style.backgroundColor == "red") {
                counter2-=0.5;
            } 
        }
        if(counter2 < 0) {
            counter2 = 0;
        }
    }

    //dropdown

    k = 1; 

    for(i = 8; i < 10; i++) {

        var selections = document.getElementsByName('vrnt' + k++);

        for (var selection of selections) {
            if(selection.selected && selection.innerHTML == rightAnswers[i-1]) {
                selection.parentElement.style.backgroundColor = "rgb(33, 214, 33)";
                counter++;
            }
            else if (selection.selected == false && selection.innerHTML == rightAnswers[i-1]) {
                selection.parentElement.style.backgroundColor = "red";
            }
        }
    }

    //drag items

    var dragies = document.querySelectorAll('p[draggable="true"]');
    for(dragie of dragies) {
        console.log(dragie.parentElement.style.order);
        if(dragie.id == dragie.parentElement.style.order) {
            dragie.style.backgroundColor = "rgb(33, 214, 33)";
            counter+=0.5;
        }
        else {
            dragie.style.backgroundColor = "red";
        }
    }

    //result

    counter += counter2;
    alert("Your score is: " + counter);
}

// Drag & Drop 

document.addEventListener('DOMContentLoaded', (event) => {

    var dragSrcEl = null;
    
    function handleDragStart(e) {
        this.style.opacity = '0.4';
        
        dragSrcEl = this;
    
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
    
        e.dataTransfer.dropEffect = 'move';
        
        return false;
    }
  
    function handleDragEnter(e) {
        this.classList.add('over');
    }
  
    function handleDragLeave(e) {
        this.classList.remove('over');
    }
  
    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); //removes redirection
        }
        
        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            var temp = this.id;
            this.id = dragSrcEl.id;
            dragSrcEl.id = temp;
        }
        
        return false;
    }
  
    function handleDragEnd(e) {
        this.style.opacity = '1';
        
        items.forEach(function (item) {
            item.classList.remove('over');
        });
    }
    
    var items = document.querySelectorAll('p[draggable="true"]');

    items.forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
    });
});

// Getting unique random number

var numbers = [];
var getRandomNumber = (min, max) => {

    var number = Math.floor(min + Math.random() * (max - min));

    if (numbers.includes(number)) return getRandomNumber(min, max);
    else {
        numbers.push(number);
        return number;
    }
};

// Using unique numbers to set order of draggable elements

function getMixed() {

    var options = document.querySelectorAll(".drag");

    for (var i = 0; i < options.length; i++) {
        options[i].style.order = getRandomNumber(1, 5);
    }
}
getMixed();

// Mixing the rest of answers

function getAnswersMixed() {

    var optionList = document.querySelectorAll(".text-option");
    
    for (var i = 0; i <= optionList.length; i++) {
        optionList[i].style.order = Math.floor(1 + Math.random()*(5 - 1));
    }
}
getAnswersMixed();