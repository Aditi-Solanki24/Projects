let quizzes = [];
let currentQuiz = [];
let userAnswers = [];

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

// Quiz creation
document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let question = document.getElementById("question").value;
  let options = {
    A: document.getElementById("optA").value,
    B: document.getElementById("optB").value,
    C: document.getElementById("optC").value,
    D: document.getElementById("optD").value
  };
  let correct = document.getElementById("correct").value;

  currentQuiz.push({ question, options, correct });

  document.getElementById("createdQuestions").innerHTML += `<p>${question}</p>`;

  this.reset();
});

function saveQuiz() {
  if (currentQuiz.length === 0) return alert("Add at least 1 question!");
  quizzes.push([...currentQuiz]);
  currentQuiz = [];
  document.getElementById("createdQuestions").innerHTML = "";
  loadQuizList();
  alert("Quiz saved successfully!");
}

// List quizzes
function loadQuizList() {
  let quizList = document.getElementById("quizList");
  quizList.innerHTML = "";
  quizzes.forEach((q, i) => {
    quizList.innerHTML += `<button onclick="startQuiz(${i})">Take Quiz ${i + 1}</button>`;
  });
}

// Start quiz
function startQuiz(index) {
  showPage("takeQuiz");
  let quiz = quizzes[index];
  userAnswers = [];
  document.getElementById("quizContainer").innerHTML = "";

  quiz.forEach((q, i) => {
    let div = `<div>
      <p><b>${i + 1}. ${q.question}</b></p>
      <label><input type="radio" name="q${i}" value="A"> ${q.options.A}</label>
      <label><input type="radio" name="q${i}" value="B"> ${q.options.B}</label>
      <label><input type="radio" name="q${i}" value="C"> ${q.options.C}</label>
      <label><input type="radio" name="q${i}" value="D"> ${q.options.D}</label>
    </div>`;
    document.getElementById("quizContainer").innerHTML += div;
  });

  document.getElementById("submitQuiz").style.display = "block";
  currentQuiz = quiz;
}

// Submit quiz
function submitQuiz() {
  let score = 0;
  currentQuiz.forEach((q, i) => {
    let ans = document.querySelector(`input[name="q${i}"]:checked`);
    if (ans && ans.value === q.correct) score++;
  });

  document.getElementById("scoreText").innerText =
    `You scored ${score} out of ${currentQuiz.length}`;
  showPage("results");
}
