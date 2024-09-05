const quizData = [
    {
        
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: 'Which country won the FIFA World Cup in 2018?',
      options: ['Brazil', 'Germany', 'France', 'Argentina'],
      answer: 'France',
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Mount Everest',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Cu', 'Fe'],
      answer: 'Au',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
      answer: 'Mars',
    },
    {
      question: 'What is the largest species of shark?',
      options: [
        'Great White Shark',
        'Whale Shark',
        'Tiger Shark',
        'Hammerhead Shark',
      ],
      answer: 'Whale Shark',
    },
    {
      question: 'Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');;
  const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = parseInt(localStorage.getItem('currentQuestion')) || 0;
  let score =  parseInt(localStorage.getItem('score')) || 0;
  let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = `Question ${currentQuestion + 1}: ${questionData.question}`;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
      
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
    }
  }
  nextButton.addEventListener('click', nextQuestion);
previousButton.addEventListener('click', previousQuestion);


  
  function nextQuestion() {
    checkAnswer();
    currentQuestion++;
    localStorage.setItem('currentQuestion', currentQuestion);
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  function previousQuestion() {
    currentQuestion--;
    localStorage.setItem('currentQuestion', currentQuestion);
    if (currentQuestion >= 0) {
      displayQuestion();
    }
  }
  function submitQuiz() {
    checkAnswer();
    displayResult();
  }
  function displayResult() {
    const resultElement = document.createElement('div');
    resultElement.className = 'result';
  
    const scoreText = `You scored ${score} out of ${quizData.length}!`;
    resultElement.innerHTML = scoreText;
  
    const answersElement = document.createElement('div');
    answersElement.className = 'answers';
  
    for (let i = 0; i < quizData.length; i++) {
      const question = quizData[i];
      const answerElement = document.createElement('p');
      answerElement.innerHTML = `Question ${i + 1}: ${question.question}<br>Correct answer: ${question.answer}<br>Your answer: ${question.options.includes(incorrectAnswers[i]) ? incorrectAnswers[i] : question.answer}`;
      answersElement.appendChild(answerElement);
    }
  
  
  nextButton.addEventListener('click', nextQuestion);
  previousButton.addEventListener('click', previousQuestion);
  submitButton.addEventListener('click', submitQuiz);
}
  
  displayQuestion();