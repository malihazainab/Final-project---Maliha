
if (isCorrect) {
    document.getElementById('mining-animation').style.display = 'flex';
    // rest of your existing code...
 }
 
 <!-- Add this JavaScript to handle the Game Over functionality -->
<script>
    // Add these new variables to your existing variables section
    const gameOver = document.getElementById('game-over');
    const finalGold = document.getElementById('final-gold');
    const finalScore = document.getElementById('final-score');
    const finalLevel = document.getElementById('final-level');
    const playAgainButton = document.getElementById('play-again-button');
    
    // Add this event listener to the play again button
    playAgainButton.addEventListener('click', resetGame);
    
    // Modify your loadQuestion function to check if there are any questions left
    function loadQuestion() {
        // Check if there are any questions left
        if (questions.length === 0) {
            showGameOver();
            return;
        }
        
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
    
    // Add this function to show the Game Over screen
    function showGameOver() {
        // Update final stats
        finalGold.textContent = gold;
        finalScore.textContent = score;
        finalLevel.textContent = level;
        
        // Show game over popup
        gameOver.style.display = 'flex';
        
        // Stop the timer
        clearInterval(timer);
        
        // Show special game over confetti
        confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#e74c3c', '#c0392b', '#FFFFFF']
        });
    }
    
    // Add this function to reset the game
    function resetGame() {
        // Hide game over screen
        gameOver.style.display = 'none';
        
        // Reset game
        startScreen.style.display = 'flex';
        
        // Reload the questions array with the original questions
        questions.length = 0; // Clear the array
        
        // Add all questions back
        questions.push(
            {
                question: "In 'Stranger Things', what is the name of the parallel dimension?",
                options: ["The Other Side", "The Upside Down", "The Void", "The Shadow Realm"],
                correctAnswer: 1,
                explanation: "It's called 'The Upside Down', a dark reflection of the real world."
            },
            // Add all the other questions back here - copy them from your original questions array
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
            }
        );
    }
    
    // Modify your goToNextLevel function to check if there are questions available for the next level
    function goToNextLevel() {
        // Hide level complete popup
        levelComplete.style.display = 'none';
        
        // Check if there are questions left for the next level
        if (questions.length === 0) {
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
    
        // Check if level is completed
        if (platformsCompleted >= platformCount) {
            showLevelComplete();
        } else {
            // Check if there are any questions left
            if (questions.length === 0) {
                showGameOver();
            } else {
                // Load next question
                loadQuestion();
            }
        }
    }
</script>
 