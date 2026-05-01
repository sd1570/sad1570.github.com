let quizData = [];
let currentIndex = 0;
let score = 0;

// Fetch the questions from the JSON file
fetch('assets/apps/questions.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuestion();
    });

function loadQuestion() {
    const q = quizData[currentIndex];
    document.getElementById('feedback-box').classList.add('hidden');
    document.getElementById('topic-tag').innerText = q.topic;
    document.getElementById('question-text').innerText = q.question;
    
    // Progress Bar
    const progress = (currentIndex / quizData.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    const list = document.getElementById('options-list');
    list.innerHTML = '';
    
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(opt);
        list.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    
    document.getElementById('feedback-box').classList.remove('hidden');
    const res = document.getElementById('result-text');

    if(selected.correct) {
        score++;
        res.innerText = "✨ Correct!";
        res.style.color = "#2ecc71";
    } else {
        res.innerText = "❌ Incorrect";
        res.style.color = "#e74c3c";
    }

    document.getElementById('rationale-text').innerText = quizData[currentIndex].rationale;
    document.getElementById('tip-text').innerText = "Wizard Tip: " + quizData[currentIndex].tip;
}

document.getElementById('next-btn').onclick = () => {
    currentIndex++;
    if(currentIndex < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-ui').classList.add('hidden');
        document.getElementById('results-ui').classList.remove('hidden');
        document.getElementById('final-score').innerText = `Score: ${score} / ${quizData.length}`;
    }
};