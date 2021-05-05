const option1 = document.querySelector('.option1'),
  option2 = document.querySelector('.option2'),
  option3 = document.querySelector('.option3'),
  option4 = document.querySelector('.option4');

const optionElems = document.querySelectorAll('.option');

const question = document.getElementById('question'),
  numberOfQuestion = document.getElementById('number-of-question'),
  numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
  indexOfPage = 0; // индекс страниц

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),
  numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
  btnTryAgain = document.getElementById('btn-try-again');

const questions = [
  {
    question: 'Как в JavaScript вычислить процент от числа ?',
    options: [
      'Так в JavaScript делать нельзя',
      'Оператор: % ',
      'Умножить на кол-во проентов и разделить на 100',
      'Вызвать метод findPrecent()',
    ],
    rightAnswer: 2
  },
  {
    question: 'Результат выражения: "13" + 7',
    options: [
      '20',
      '137',
      'undefined',
      'error',
    ],
    rightAnswer: 1
  },
  {
    question: 'На JavaScript нельзя писать:',
    options: [
      'Игры',
      'Скрипт для сайтов',
      'Десктопные приложения',
      'Отрицательно',
    ],
    rightAnswer: 3
  },
  {
    question: 'Чем метод отличается от функции ?',
    options: [
      'Ничем',
      'Метод - это в объекте',
      'Функция - это в объекте',
      'Оба не в объекте',
    ],
    rightAnswer: 1
  },
  {
    question: 'Как округлить число 9.65 до ближайшего целого ?',
    options: [
      'round(9.65)',
      'rnd(9.65)',
      'Math.rnd(9.65)',
      'Math.round(9.65)',
    ],
    rightAnswer: 3
  },
  {
    question: 'На что влияет описание DOCTYPE в начале документа ?',
    options: [
      'На внешний валидатор при проверке соответствия стандарту',
      'DOCTYPE – атавизм, он ни на что не влияет',
      'Только на наличие всех свойств в DOM',
      'На особенности работы XmlHttpRequest',
    ],
    rightAnswer: 0
  },
  {
    question: 'Что делает оператор ** ?',
    options: [
      'Умножает число само на себя',
      'Находит ошибку',
      'Возводит в степень',
      'Нет такого оператора',
    ],
    rightAnswer: 2
  },
];

numberOfAllQuestion.innerHTML = questions.length; // вывод кол-ва всех вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // вывод вопроса

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
  indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if(indexOfPage == questions.length) {
    quizOver();
  } else {
    if(completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if(item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if(hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    };
    if(completedAnswers == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  };
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
  if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
}

const disabledOptions = () => {
  optionElems.forEach(item => {
    item.classList.add('disabled');
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  })
}

const enableOptions = () => {
  optionElems.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong');
  })
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
};

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if(!optionElems[0].classList.contains('disabled')) {
    alert('Нужно выбрать один из вариантов ответа!');
  } else {
    randomQuestion();
    enableOptions();
  }
};

btnNext.addEventListener('click', validate);

for(option of optionElems) {
  option.addEventListener('click', e => checkAnswer(e)
  );
}

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});