// Game variables
let score = 0;
let gold = 0;
let level = 1;
let platformsCompleted = 0;
let timeLeft = 30;
let timer;
let levelGoldCollected = 0;
let levelScoreEarned = 0;
let isJumping = false;
let platforms = [];
let goldNuggets = [];
let currentQuestion = null;
const platformCount = 5; // Reduced from 8 for simplicity
const platformSpacing = 100; // Increased from 80 for better visibility

// DOM Elements
const scoreDisplay = document.getElementById('score-display');
const goldDisplay = document.getElementById('gold-display');
const levelDisplay = document.getElementById('level-display');
const timerDisplay = document.getElementById('timer-display');
const character = document.getElementById('character');
const platformsContainer = document.getElementById('platforms-container');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedbackPopup = document.getElementById('feedback-popup');
const popupTitle = document.getElementById('popup-title');
const popupMessage = document.getElementById('popup-message');
const continueButton = document.getElementById('continue-button');
const levelComplete = document.getElementById('level-complete');
const levelMessage = document.getElementById('level-message');
const levelGold = document.getElementById('level-gold');
const levelScore = document.getElementById('level-score');
const nextLevelButton = document.getElementById('next-level-button');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameOver = document.getElementById('game-over');
const finalGold = document.getElementById('final-gold');
const finalScore = document.getElementById('final-score'); 
const finalLevel = document.getElementById('final-level');

// Trivia questions focused on movies, games, and TV shows
const questions = [
    {
        question: "In 'Stranger Things', what is the name of the parallel dimension?",
        options: ["The Other Side", "The Upside Down", "The Void", "The Shadow Realm"],
        correctAnswer: 1,
        explanation: "It's called 'The Upside Down', a dark reflection of the real world."
    },
    {
        question: "Which video game features a protagonist named Joel and a girl named Ellie in a post-apocalyptic world?",
        options: ["Days Gone", "The Last of Us", "Horizon Zero Dawn", "State of Decay"],
        correctAnswer: 1,
        explanation: "The Last of Us follows Joel and Ellie's journey across a post-apocalyptic United States."
    },
    {
        question: "In the Marvel Cinematic Universe, which movie introduced Black Panther?",
        options: ["Black Panther", "Captain America: Civil War", "Avengers: Age of Ultron", "Iron Man 3"],
        correctAnswer: 1,
        explanation: "Black Panther first appeared in 'Captain America: Civil War' before getting his own movie."
    },
    {
        question: "Which game features a character named Kratos seeking revenge against the Greek gods?",
        options: ["Assassin's Creed Odyssey", "God of War", "Hades", "Immortals Fenyx Rising"],
        correctAnswer: 1,
        explanation: "God of War follows Kratos's quest for vengeance against the gods of Olympus."
    },
    {
        question: "What is the name of the fictional continent where Game of Thrones primarily takes place?",
        options: ["Essos", "Westeros", "Sothoryos", "Ulthos"],
        correctAnswer: 1,
        explanation: "Most of Game of Thrones is set in Westeros, with some storylines in Essos."
    },
    {
        question: "In 'The Mandalorian', what species is 'Baby Yoda' (Grogu)?",
        options: ["Yoda's species", "Mandalorian", "Jawa", "Hutt"],
        correctAnswer: 0,
        explanation: "Grogu is the same species as Yoda, though the species has never been officially named."
    },
    {
        question: "Which video game franchise features a character named Master Chief?",
        options: ["Call of Duty", "Halo", "Gears of War", "Destiny"],
        correctAnswer: 1,
        explanation: "Master Chief is the protagonist of the Halo series."
    },
    {
        question: "What was the first Pixar movie?",
        options: ["Monsters, Inc.", "Finding Nemo", "Toy Story", "A Bug's Life"],
        correctAnswer: 2,
        explanation: "Toy Story, released in 1995, was Pixar's first feature film."
    },
    {
        question: "In 'Breaking Bad', what color is the crystal meth produced by Walter White?",
        options: ["Red", "Yellow", "Blue", "Clear"],
        correctAnswer: 2,
        explanation: "Walter's signature product was blue crystal meth, known for its purity."
    },
    {
        question: "Which video game character collects rings and runs at super speed?",
        options: ["Mario", "Crash Bandicoot", "Sonic the Hedgehog", "Spyro"],
        correctAnswer: 2,
        explanation: "Sonic the Hedgehog is known for his super speed and collecting golden rings."
    },
    {
         question: "Which animated film features a rat who dreams of becoming a chef?",
         options: ["Finding Nemo", "Ratatouille", "The Incredibles", "WALL-E"],
         correctAnswer: 1,
         explanation: "Ratatouille follows Remy, a rat with an exceptional sense of taste who dreams of becoming a chef in Paris."
     },
     {
          question: "In 'Stranger Things', who is taken to the Upside Down in Season 1?",
          options: ["Mike Wheeler", "Will Byers", "Eleven", "Dustin Henderson"],
          correctAnswer: 1,
          explanation: "Will Byers is abducted by the Demogorgon and taken to the Upside Down in the first episode."
     },
     {
          question: "Which video game series features a protagonist named Nathan Drake?",
          options: ["Tomb Raider", "Far Cry", "Uncharted", "Assassin's Creed"],
          correctAnswer: 2,
          explanation: "Nathan Drake is the treasure-hunting protagonist of the Uncharted series."
     },
     {
          question: "Which sci-fi show features a ship called Serenity and its crew of smugglers?",
          options: ["Battlestar Galactica", "Stargate SG-1", "Firefly", "The Expanse"],
          correctAnswer: 2,
          explanation: "Firefly follows the crew of Serenity, led by Captain Malcolm Reynolds, as they take on smuggling jobs."
     },
     {
          question: "What is the name of the fictional African nation in Black Panther?",
          options: ["Zamunda", "Sokovia", "Wakanda", "Latveria"],
          correctAnswer: 2,
          explanation: "Wakanda is the technologically advanced African nation ruled by T'Challa, the Black Panther."
     },
     {
          question: "In 'The Witcher', what is the name of Geralt's horse?",
          options: ["Shadowmere", "Epona", "Roach", "Agro"],
          correctAnswer: 2,
          explanation: "Geralt names all his horses Roach, with the horse in the Netflix series being a chestnut mare."
     },
     {
          question: "Which horror film franchise features a killer doll named Chucky?",
          options: ["Annabelle", "Child's Play", "The Conjuring", "Puppet Master"],
          correctAnswer: 1,
          explanation: "Chucky is the main antagonist in the Child's Play franchise, a doll possessed by the spirit of a serial killer."
     },
     
];


// Initialize game
function initGame() {
    // Set up event listeners
    startButton.addEventListener('click', startGame);
    continueButton.addEventListener('click', continueMining);
    nextLevelButton.addEventListener('click', goToNextLevel);
 
    // Position character initially
    character.style.bottom = '10px';
}

// Start the game
function startGame() {
    // Hide start screen
    startScreen.style.display = 'none';
 
    // Reset game variables
    score = 0;
    gold = 0;
    level = 1;
    platformsCompleted = 0;
    levelGoldCollected = 0;
    levelScoreEarned = 0;
 
    // Update displays
    updateDisplays();
 
    // Create platforms and gold nuggets
    createPlatformsAndGold();
 
    // Load first question
    loadQuestion();
}

// Update all stat displays
function updateDisplays() {
    scoreDisplay.textContent = score;
    goldDisplay.textContent = gold;
    levelDisplay.textContent = level;
}

// Create platforms and gold nuggets
function createPlatformsAndGold() {
    // Clear previous platforms
    platformsContainer.innerHTML = '';
    platforms = [];
    goldNuggets = [];
 
    // Create new platforms and gold nuggets
    for (let i = 0; i < platformCount; i++) {
        // Create platform
        const platform = document.createElement('div');
        platform.className = 'platform';
        platform.style.bottom = `${i * platformSpacing + 10}px`;
        platformsContainer.appendChild(platform);
        platforms.push(platform);
     
        // Create gold nugget
        const goldNugget = document.createElement('div');
        goldNugget.className = 'gold-nugget';
        goldNugget.style.bottom = `${i * platformSpacing + 50}px`;
        platformsContainer.appendChild(goldNugget);
        goldNuggets.push(goldNugget);
    }
 
    // Position character on first platform
    character.style.bottom = '40px';
}

// Load a random question
function loadQuestion() {
  
    // Get random question
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

      // Remove question from available questions
      questions.splice(randomIndex, 1);

    // Set question text
    questionText.textContent = currentQuestion.question;
 
    // Create option buttons
    optionsGrid.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option';
        optionButton.textContent = option;
        optionButton.dataset.index = index;
        optionButton.addEventListener('click', () => checkAnswer(index, currentQuestion.correctAnswer, currentQuestion.explanation));
        optionsGrid.appendChild(optionButton);
    });
 
    // Start timer
    startTimer();
}

// Start the question timer
function startTimer() {
    // Clear previous timer
    clearInterval(timer);
 
    // Reset time
    timeLeft = 15;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    timerDisplay.classList.remove('warning');
 
    // Start countdown
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
     
        // Warning when time is low
        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }
     
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timer);
            showTimeUp();
        }
    }, 1000);
}

// Show time's up message
function showTimeUp() {
    popupTitle.textContent = "Time's Up!";
    popupMessage.textContent = "You ran out of time! Try to answer faster.";
    feedbackPopup.style.display = 'flex';
}

// Check if answer is correct
function checkAnswer(selectedIndex, correctIndex, explanation) {
    // Stop the timer
    clearInterval(timer);
 
    const isCorrect = selectedIndex === correctIndex;
 
    if (isCorrect) {
        // Handle correct answer
        popupTitle.textContent = "Correct!";
        popupMessage.textContent = explanation;
     
        // Calculate points (more points for faster answers)
        const pointsEarned = 100 * level + Math.floor(timeLeft * 3);
        score += pointsEarned;
        levelScoreEarned += pointsEarned;
     
        // Show correct answer popup
        feedbackPopup.style.display = 'flex';
     
        // Jump to next platform and collect gold
        platformsCompleted++;
        jumpToNextPlatform();
     
        // Show confetti effect
        showConfetti();
     
        // Check if level completed
        if (platformsCompleted >= platformCount) {
            // Level will be completed after closing popup
            continueButton.textContent = "Complete Level";
        }
    } else {
        // Handle incorrect answer
        popupTitle.textContent = "Incorrect!";
        popupMessage.textContent = `The correct answer is: ${currentQuestion.options[correctIndex]}. ${explanation}`;
        feedbackPopup.style.display = 'flex';
    }
 
    // Update score display
    updateDisplays();
}

// Jump character to next platform
function jumpToNextPlatform() {
    if (platformsCompleted < platformCount) {
        // Calculate new position
        const newHeight = (platformsCompleted - 1) * platformSpacing + 40;
     
        // Move character
        character.style.bottom = `${newHeight}px`;
     
        // Collect gold nugget
        setTimeout(() => {
            collectGold(platformsCompleted - 1);
        }, 400);
    }
}

// Collect gold nugget
function collectGold(nuggetIndex) {
    if (nuggetIndex >= 0 && nuggetIndex < goldNuggets.length) {
        const goldNugget = goldNuggets[nuggetIndex];
     
        // Only collect if not already collected
        if (goldNugget.style.opacity !== '0') {
            // Hide the nugget
            goldNugget.style.opacity = '0';
         
            // Calculate gold value (increases with level)
            const goldValue = 10 * level;
            gold += goldValue;
            levelGoldCollected += goldValue;
         
            // Show gold collection effect
            showGoldCollectionEffect(goldValue, nuggetIndex);
         
            // Update gold display
            updateDisplays();
        }
    }
}

// Show gold collection effect
function showGoldCollectionEffect(value, nuggetIndex) {
    const effect = document.createElement('div');
    effect.className = 'gold-effect';
    effect.textContent = `+${value}`;
 
    // Position effect near collected nugget
    const bottom = (nuggetIndex * platformSpacing + 50);
    effect.style.bottom = `${bottom}px`;
    effect.style.left = '50%';
    effect.style.transform = 'translateX(-50%)';
 
    // Add to DOM
    document.querySelector('.game-container').appendChild(effect);
 
    // Animate the effect
    let pos = bottom;
    let opacity = 1;
    const animate = setInterval(() => {
        pos += 1;
        opacity -= 0.02;
        effect.style.bottom = `${pos}px`;
        effect.style.opacity = opacity;
     
        if (opacity <= 0) {
            clearInterval(animate);
            effect.remove();
        }
    }, 20);
}

// Show confetti effect
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Continue mining after answering a question
function continueMining() {
    // Hide feedback popup
    feedbackPopup.style.display = 'none';
 
    // Check if level is completed
    if (platformsCompleted >= platformCount) {
        showLevelComplete();
    } else {
        // Load next question
        loadQuestion();
    }
}

// Show Game Over screen
function showGameOver() {
    // Update Game Over popup
    finalGold.textContent = levelGoldCollected;
    finalLevel.textContent = level;
    finalScore.textContent = levelScoreEarned;
 
    // Show level complete popup
    levelComplete.style.display = 'flex';
 
    // Show big confetti celebration
    confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFC107', '#FFEB3B']
    });
}

// Show level complete screen
function showLevelComplete() {
    // Update level complete popup
    levelMessage.textContent = `You've completed Level ${level}!`;
    levelGold.textContent = levelGoldCollected;
    levelScore.textContent = levelScoreEarned;
 
    // Show level complete popup
    levelComplete.style.display = 'flex';
 
    // Show big confetti celebration
    confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFC107', '#FFEB3B']
    });
}

// Go to next level
function goToNextLevel() {
    // Hide level complete popup
    levelComplete.style.display = 'none';
 
    // Increment level
    level++;
 
    // Reset level-specific variables
    platformsCompleted = 0;
    levelGoldCollected = 0;
    levelScoreEarned = 0;
 
    // Update displays
    updateDisplays();
 
    // Create new platforms and gold nuggets
    createPlatformsAndGold();
 
    // Load first question of new level
    loadQuestion();
  
    // Reset continue button text
    continueButton.textContent = "Continue Mining";
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);


    // Modify your goToNextLevel function to check if there are questions available for the next level
function goToNextLevel() {
  // Hide level complete popup
  levelComplete.style.display = 'none';
  
  // Check if there are questions left for the next level
  if (questions.length == 0) {
      showGameOver();
      return;
  }

  // Increment level
  level++;

  // Reset level-specific variables
  platformsCompleted = 0;
  levelGoldCollected = 0;
  levelScoreEarned = 0;

  // Update displays
  updateDisplays();

  // Create new platforms and gold nuggets
  createPlatformsAndGold();

  // Load first question of new level
  loadQuestion();

  // Reset continue button text
  continueButton.textContent = "Continue Mining";
}

// Also modify your continueMining function to check if there are questions left
function continueMining() {
  // Hide feedback popup
  feedbackPopup.style.display = 'none';

  // Check if there are any questions left
  if (questions.length == 0) {
          showGameOver();

  // Check if level is completed
  } else if (platformsCompleted >= platformCount) {
      showLevelComplete();
  } else {
          // Load next question
          loadQuestion();
      }
}