// List of words with corresponding clues
const wordsAndClues = [
    { word: "pinto", clues: ["Ang daanan ng tao sa loob ng bahay.", "The entrance of a house."] },
    { word: "talon", clues: ["Isang natural na anyo ng tubig na bumabagsak mula sa mataas na lugar.", "A natural form of water falling from a height."] },
    { word: "bunga", clues: ["Ang prutas ng isang halaman.", "The fruit of a plant."] },
    { word: "buwan", clues: ["Ang satellite ng ating planeta.", "The satellite of our planet."] },
    { word: "tamis", clues: ["Isang lasa na karaniwang natatamo mula sa asukal.", "A taste commonly derived from sugar."] },
    { word: "bahay", clues: ["Isang lugar kung saan tayo nakatira.", "A place where we live."] },
    { word: "tatay", clues: ["Tawag sa ama.", "Term for father."] },
    { word: "sinta", clues: ["Isang salitang pang-ibig.", "A term of endearment for a loved one."] },
    { word: "laban", clues: ["Pagkilos o aktibidad upang ipaglaban ang isang bagay.", "Action or activity to fight for something."] },
    { word: "sikat", clues: ["Tanyag o kilala sa isang lugar o larangan.", "Famous or well-known in a field or place."] },
    { word: "dagat", clues: ["Malawak na anyong tubig na maalat.", "A large body of salty water."] },
    { word: "araro", clues: ["Kagamitang pangbukid na ginagamit sa pagsasaka.", "A farming tool used for plowing fields."] },
    { word: "bikas", clues: ["Hitsura o anyo ng isang tao o bagay.", "Appearance or form of a person or thing."] },
    { word: "tanso", clues: ["Isang uri ng metal na madalas ginagamit sa dekorasyon o barya.", "A type of metal often used in decorations or coins."] },
    { word: "bitin", clues: ["Pakiramdam ng hindi sapat o kulang.", "The feeling of something being incomplete or lacking."] },
    { word: "linaw", clues: ["Kalidad ng pagiging malinaw o kita sa mata.", "The quality of being clear or visible to the eyes."] },
    { word: "sugat", clues: ["Pinsala sa balat o katawan.", "An injury to the skin or body."] },
    { word: "lamig", clues: ["Kondisyon ng mababang temperatura.", "A condition of low temperature or coldness."] },
    { word: "tigas", clues: ["Katigasan o kawalang-lambot.", "Hardness or firmness."] },
    { word: "sakit", clues: ["Pakiramdam ng hindi maganda sa katawan.", "A feeling of discomfort in the body."] },
    { word: "boses", clues: ["Tinig ng tao o hayop.", "Voice of a person or animal."] },
    { word: "salit", clues: ["Mga tunog o simbolo na ginagamit sa komunikasyon.", "Sounds or symbols used in communication."] },
    { word: "tanda", clues: ["Isang palatandaan ng edad.", "Its an Age."] },
    { word: "kanin", clues: ["Nilutong bigas na karaniwang kinakain.", "Cooked rice commonly eaten."] },
    { word: "ganda", clues: ["Isang katangian ng pagiging kaakit-akit o maganda.", "A quality of being attractive or beautiful."] }
]

let attempts = 6;
let currentWord;

// Function to initialize the game
function initGame() {
    const randomIndex = Math.floor(Math.random() * wordsAndClues.length);
    currentWord = wordsAndClues[randomIndex].word;
    const clues = wordsAndClues[randomIndex].clues;
    document.getElementById('clue').innerText = `Filipino: ${clues[0]} \nEnglish: ${clues[1]}`;
    document.getElementById('attempts').innerText = `You have ${attempts} attempts left.`;
    document.getElementById('submitBtn').disabled = false; // Enable the submit button
    document.getElementById('guessInput').value = ''; // Clear input
    document.getElementById('feedback').innerText = ''; // Clear feedback
}

// Function to check the user's guess
function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const feedback = document.getElementById('feedback');
    const userGuess = guessInput.value.toLowerCase();

    if (userGuess.length !== 5) {
        feedback.innerText = "Your guess must be 5 letters long!";
        return;
    }

    let result = '';
    for (let i = 0; i < currentWord.length; i++) {
        if (userGuess[i] === currentWord[i]) {
            result += userGuess[i].toUpperCase(); // Correct letter in correct position
        } else if (currentWord.includes(userGuess[i])) {
            result += userGuess[i].toLowerCase(); // Correct letter in wrong position
        } else {
            result += '_'; // Incorrect letter
        }
    }

    feedback.innerText = `Result: ${result}`;

    if (userGuess === currentWord) {
        alert("Congratulations! You've guessed the word correctly.");
        document.getElementById('submitBtn').disabled = true;
    } else {
        attempts--;
        if (attempts > 0) {
            document.getElementById('attempts').innerText = `You have ${attempts} attempts left.`;
        } else {
            alert(`Sorry, you're out of attempts. The word was '${currentWord}'.`);
            document.getElementById('submitBtn').disabled = true;
        }
    }

    guessInput.value = '';
}

// Function to add a letter to the input when a key is clicked
function addToGuess(letter) {
    const guessInput = document.getElementById('guessInput');
    if (guessInput.value.length < 5) {
        guessInput.value += letter;
    }
}

// Function to handle Backspace button click
function handleBackspace() {
    const guessInput = document.getElementById('guessInput');
    guessInput.value = guessInput.value.slice(0, -1); // Remove the last character
}

// Function to create the keyboard
function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const rows = [
        'Q W E R T Y U I O P',
        'A S D F G H J K L',
        'Z X C V B N M'
    ];

    rows.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        row.split(' ').forEach(letter => {
            const key = document.createElement('button');
            key.innerText = letter;
            key.className = 'key';
            key.onclick = () => addToGuess(letter);
            keyboardRow.appendChild(key);
        });
        keyboard.appendChild(keyboardRow);
    });

    // Add Backspace button next to M in the same row
    const backspaceKey = document.createElement('button');
    backspaceKey.innerText = '←'; // Backspace symbol
    backspaceKey.className = 'key';
    backspaceKey.onclick = handleBackspace; // Handle backspace

    // Append Backspace to the last keyboard row
    const lastRow = keyboard.lastChild; // Get the last row (where M is)
    lastRow.appendChild(backspaceKey); // Add the Backspace button next to M
}

// Function to handle Next button click
function handleNext() {
    attempts = 6; // Reset attempts
    initGame();   // Initialize a new game
}

// Initialize the game on load
window.onload = () => {
    initGame();
    createKeyboard();  // Create the virtual keyboard
};

// Add event listeners for buttons
document.getElementById('submitBtn').addEventListener('click', checkGuess);
document.getElementById('nextBtn').addEventListener('click', handleNext);
