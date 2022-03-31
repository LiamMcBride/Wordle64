
let letters = ["a",
"b",
"c",
"d",
"e",
"f",
"g",
"h",
"i",
"j",
"k",
"l",
"m",
"n",
"o",
"p",
"q",
"r",
"s",
"t",
"u",
"v",
"x",
"y",
"z"]


function makeBoard(number, totalBoard){
    let squares = [];

    let wholeBoard = document.createElement("div");
    let table = document.createElement("table");
    let row = document.createElement("tr");
    for(let i = 0; i < 5 * 69; i++){
        let col = document.createElement("td");
        square = document.createElement("div");
        square.setAttribute("style", "color: white; text-align: center; border: 2px solid black; width: 20px; height: 20px; background: #676c6e; padding: 0px;");
        squares.push(square);
        col.appendChild(square);
        row.appendChild(col);
        col = null;
        square = null;
        if((i + 1) % 5 === 0){
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
    // board[k].push(squares);
    // squares = [];
    //document.body.appendChild(table);
    totalBoard.push(squares);

    let heading = document.createElement("h2");
    heading.innerHTML = "Board " + number;
    wholeBoard.appendChild(heading);
    wholeBoard.appendChild(table);

    return wholeBoard;
}

function inputLetter(letter, counter, totalBoard){
    for(let i =0; i < totalBoard.length; i++){
        totalBoard[i][counter].innerHTML = letter;
    }
}

function changeColor(square, color){
    square.setAttribute("style", "color: white; text-align: center; border: 2px solid black; width: 20px; height: 20px; background: " + color + "; padding: 0px;");
}

function grade(numberOfBoards, totalBoard, answers, counter){
    let solved = 0;
    for(let i = 0; i < numberOfBoards; i++){
        let answerCounter = 0;
        let totalWord = "";
        for(let j = counter - 5; j < counter; j++){
            totalWord += totalBoard[i][j].innerHTML;
            if(totalBoard[i][j].innerHTML === answers[i][answerCounter]){
                changeColor(totalBoard[i][j], "#009038");
            }
            else if(answers[i].includes(totalBoard[i][j].innerHTML)){
                changeColor(totalBoard[i][j], "#DFDB2B");
            }
            else{
                changeColor(totalBoard[i][j], "gray");
            }
            answerCounter += 1;
        }
        if(totalWord === answers[i]){
            solved += 1;
        }
        
    }
    return solved;
}


function setScore(element, guessNumber, boardsSolved){
    let text = "Total Guesses: "+ guessNumber + "/69\nTotal Boards Solved: " + boardsSolved + "/64";

    element.innerHTML = text;
}

// function inputColor(letter, counter, totalBoard){
//     for(let i =0; i < totalBoard.length; i++){
//         totalBoard[i][counter].innerHTML = letter;
//     }
// }
let scoreHeader = document.createElement("h2");
let table;
let totalBoard = [];
let answers = [
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky",
"soare", "crisp", "depot", "essay", "feral", "rocky", "feral", "rocky"
];
let numberOfBoards = 64;
let totalGuesses = 69;
let boardsSolved = 0;
document.body.appendChild(scoreHeader);

let base = document.createElement("div");
let row = document.createElement("div");
for(let i = 0; i < numberOfBoards; i++){
    let cell = document.createElement("td");

    table = makeBoard(i + 1,totalBoard);

    cell.appendChild(table);

    row.appendChild(cell);

    cell.setAttribute("style", "border: solid black 2px");

    if((i + 1) % 8 === 0){
        base.appendChild(row);
        row = document.createElement("div");
    }

     
}

document.body.appendChild(base);



// table = makeBoard(2,totalBoard);

// document.body.appendChild(table);


let counter = 0;
let guessNumber = 0;

document.body.addEventListener("keydown", function(event) {
    if(event.key === "Backspace"){
        counter--;
        inputLetter("", counter, totalBoard);
    }
    else if(letters.includes(event.key)){
        if(counter - (5 * guessNumber) < 5){
            inputLetter(event.key, counter, totalBoard);
            counter++;
        }
    }
    else if(event.key === "Enter" && counter - (5 * guessNumber) === 5){
        guessNumber++;
        boardsSolved += grade(numberOfBoards, totalBoard, answers, counter);
        setScore(scoreHeader, guessNumber, boardsSolved);
    }
});

