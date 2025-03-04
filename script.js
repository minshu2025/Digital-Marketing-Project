document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("quiz-section").style.display = "none";
});

function toggleContent(sectionId) {
    let content = document.getElementById(sectionId);
    content.style.display = content.style.display === "none" ? "block" : "none";
}

function startQuiz() {
    document.getElementById("quiz-section").style.display = "block";
    currentQuestionIndex = 0;
    userAnswers = [];
    loadQuestion();
}

let currentQuestionIndex = 0;
let userAnswers = [];
let quizQuestions = [
    { question: "What is the primary goal of digital marketing?", options: ["Increase online sales", "Boost website traffic", "Enhance brand awareness", "All of the above"], answer: 3 },
    { question: "Which of the following is a type of SEO?", options: ["On-Page SEO", "Off-Page SEO", "Technical SEO", "All of the above"], answer: 3 },
    { question: "What does PPC stand for?", options: ["Pay-Per-Click", "Pay-Per-Content", "Promotional Product Campaign", "Paid Platform Click"], answer: 0 },
    { question: "Which platform is commonly used for PPC advertising?", options: ["Google Ads", "Instagram", "Snapchat", "Tumblr"], answer: 0 },
    { question: "What is the main purpose of social media marketing?", options: ["Increase brand awareness", "Direct interaction with customers", "Drive website traffic", "All of the above"], answer: 3 },
    { question: "Which factor is important for ranking in SEO?", options: ["Backlinks", "Keyword Optimization", "Site Speed", "All of the above"], answer: 3 },
    { question: "Which of these is NOT a social media marketing platform?", options: ["Facebook", "LinkedIn", "Google Ads", "Instagram"], answer: 2 },
    { question: "What is a key benefit of digital marketing?", options: ["Higher engagement", "Cost efficiency", "Wider audience reach", "All of the above"], answer: 3 },
    { question: "Which metric measures the effectiveness of a PPC campaign?", options: ["Click-Through Rate", "Social Shares", "Follower Count", "Likes"], answer: 0 },
    { question: "Which SEO strategy involves optimizing meta tags and content?", options: ["Off-Page SEO", "On-Page SEO", "Technical SEO", "None of the above"], answer: 1 }
];

function loadQuestion() {
    let quizContainer = document.getElementById("quiz-questions");
    let questionData = quizQuestions[currentQuestionIndex];
    quizContainer.innerHTML = `<h3 class='quiz-question'>Q.${currentQuestionIndex + 1}: ${questionData.question}</h3>`;
    
    let optionsContainer = "<div class='quiz-options'>";
    questionData.options.forEach((option, index) => {
        let optionLetter = String.fromCharCode(97 + index); // a, b, c, d
        optionsContainer += `<button class='quiz-option' onclick='checkAnswer(${index})'><strong>${optionLetter}.</strong> ${option}</button>`;
    });
    optionsContainer += "</div>";
    
    quizContainer.innerHTML += optionsContainer;
    
    document.getElementById("prev-question").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    document.getElementById("next-question").style.display = "none";
    document.getElementById("submit-quiz").style.display = currentQuestionIndex === quizQuestions.length - 1 ? "inline-block" : "none";
}

function checkAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    document.getElementById("next-question").style.display = "inline-block";
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    let score = 0;
    let resultHTML = "<h3>Quiz Results</h3>";
    
    quizQuestions.forEach((question, index) => {
        let userAnswer = userAnswers[index];
        let correctAnswer = question.answer;
        
        if (userAnswer === correctAnswer) {
            score++;
            resultHTML += `<p><strong>Q${index + 1}:</strong> ✅ Correct</p>`;
        } else {
            resultHTML += `<p><strong>Q${index + 1}:</strong> ❌ Incorrect. Your answer: ${question.options[userAnswer] || "Not answered"}. Correct answer: ${question.options[correctAnswer]}.</p>`;
        }
    });
    
    resultHTML += `<h4>Your Score: ${score} / ${quizQuestions.length}</h4>`;
    document.getElementById("quiz-result").innerHTML = resultHTML;
}

// Add Submit Button
document.getElementById("quiz-section").innerHTML += `
    <button id="submit-quiz" class="btn btn-warning hidden" onclick="submitQuiz()">Submit</button>
`;
