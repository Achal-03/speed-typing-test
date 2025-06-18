let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let result = document.getElementById("result");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");

let options = {
    method: "GET"
};

let counter = 0;
let uniqueId;

// Function to fetch and display a new random quote
function fetchAndDisplayQuote() {
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = jsonData.content;
        });
}

// Function to start the timer
function startTimer() {
    counter = 1;
    timer.textContent = counter;
    uniqueId = setInterval(function() {
        timer.textContent = counter;
        counter += 1;
    }, 1000);
}

// Function to reset the game
function resetGame() {
    clearInterval(uniqueId);
    quoteInput.value = "";
    result.textContent = "";
    spinner.classList.add("d-none");
    fetchAndDisplayQuote();
    startTimer();
}

// Function to validate the input against the displayed quote
function validate() {
    if (quoteDisplay.textContent === quoteInput.value.trim()) {
        clearInterval(uniqueId);
        result.textContent = "You typed in " + counter + " seconds";
    } else {
        result.textContent = "You typed an incorrect sentence";
    }
}

// Event listener for the submit button
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    validate();
});

// Event listener for the reset button
resetBtn.addEventListener("click", function(event) {
    event.preventDefault();
    resetGame();
});

// Initial setup
spinner.classList.remove("d-none");
fetchAndDisplayQuote();
startTimer();
