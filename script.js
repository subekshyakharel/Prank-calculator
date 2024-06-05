
const allButtonElm = document.querySelectorAll(".btn");
// console.log(allButtonElm);

let strToDisplay = "";
const displayElm = document.querySelector(".display");

const operators = ["%", "/", "*", "-", "+"];
let lastOperator = ""; 


//load the audio
const audio = new Audio("./assets/error.mp3")

const buttonAction = (value) => {
    displayElm.classList.remove("prank");

    if (value === 'AC') {
        strToDisplay = "";
        return display(strToDisplay);
    }

    if (value === '=' || value == "Enter") {
        lastOperator = "";
        const lastchar = strToDisplay[strToDisplay.length - 1];

        // check if it is one of the operators 
        if (operators.includes(lastchar)) {
            strToDisplay = strToDisplay.slice(0, -1);
        }

        return displayTotal();
    }

    if (value === 'C') {
        strToDisplay = strToDisplay.slice(0, -1);
        return display(strToDisplay);
    }

    // show only last clicked operator
    if (operators.includes(value)) {
        lastOperator = value;

        const lastchar = strToDisplay[strToDisplay.length - 1];

        if (operators.includes(lastchar)) {
            strToDisplay = strToDisplay.slice(0, -1);
        }
    }

    // handle the dot click
    if (value === '.') {
        const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

        const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
        if (lastNumberSet.includes(".")) {
            return;
        }
        if (!lastOperator && strToDisplay.includes(".")) {
            return;
        }
    }

    strToDisplay += value;
    display(strToDisplay);
}

// attach click event to all the buttons
allButtonElm.forEach((btn) => {
    btn.addEventListener('mousedown', ()=>{
        btn.style.scale = ".9"
    })

    btn.addEventListener("click", () => {
        btn.style.scale = "1"
        const value = btn.innerText;
        buttonAction(value);
    });
});

// update clicked button value to display area
const display = (str) => {
    displayElm.innerText = str || "0.00";
}

// Calculate total
const displayTotal = () => {
    const extraValue = randomValue();
    if (extraValue) {
        displayElm.classList.add("prank");
        audio.play();
    }
    const total = eval(strToDisplay) + extraValue;
    // console.log(total);
    strToDisplay = total.toString();
    display(total);
}

const randomValue = () => {
    const num = Math.round(Math.random() * 10); // 0-10
    return num < 4 ? num : 0;
}

// Binding keyword with browser app
document.addEventListener("keypress", (e)=>{
console.log(e)
const value = e.key;
if(e.code.includes("Key")){
    return;
}
// if(value == "Enter"){
//     return; 
// }
buttonAction(value)
})

