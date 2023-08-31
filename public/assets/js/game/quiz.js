const quizData = [
	{
		question: "هل تعتقد أن أهم جزء في العمل هي روح الفريق ؟",
		a: "نعم ",

		b: "ربما في بعض الأحيان",

		correct: "b",
	},
	{
		question: "ماذا تفعل اذا تواجدت في غرفة مزدحمة ؟",
		a: "تجلس في منتصف الغرفة ",
		b: "تجلس في طرف الغرفة",

		correct: "b",
	},
	{
		question: "اذا صادفتك ظاهرة غريبة",
		a: "تبحث في الأمر ",
		b: "يلفت انتباهك في البداية ثم تتجاهله",

		correct: "a",
	},
	{
		question: "هل تحب الخروج في الطبيعة و التنزه ؟",
		a: "لا",
		b: "نعم",

		correct: "b",
	},
	{
		question: "في حال حصولك على مبلغ ",
		a: "تدخره",
		b: "تشتري حاجياتك و تدخر المتبقي",

		correct: "b",
	},
	{
		question: "عندما تصاب بالتوتر",
		a: "تحاول تهدئة نفسك و تظهر لمن حولك أنك هادئ",
		b: "تفضل العزلة و الجلوس بعيدا",

		correct: "a",
	},

	{
		question: "تشعر بالراحة عند تواجدك في مكان",
		a: "منعزل",
		b: "مزدحم",

		correct: "b",
	},
	{
		question: "تجيد العمل بشكل افضل اثناء",
		a: "الليل",
		b: "النهار",

		correct: "a",
	},
	{
		question: "تفضل الذهاب في رحلة ",
		a: "جبلية",
		b: "بحرية",

		correct: "b",
	},
	{
		question: "تفضل العيش في ",
		a: "الأماكن الصاخبة",
		b: "الأماكن الهادئة",

		correct: "b",
	},
	{
		question: "أتيحت لك  فرصة الحصول على قوة خارقة ستختار",
		a: "الإختفاء ",
		b: "الطيران",

		correct: "b",
	},
	{
		question: "اذا قابلت أحد يحتاج المساعدة",
		a: "تهرع في مساعدته",
		b: "تتردد",

		correct: "a",
	},
	{
		question: "هل تحب المشاركة في الاحداث و الحفلات الاجتماعية",
		a: "نعم",
		b: "لا",

		correct: "a",
	},
	{
		question: "اذا كان لديك بعض الاغراض القديمة الصالحة للاستعمال",
		a: "تتبرع بها",
		b: "تفكر بطريقة لعرضها للبيع ",

		correct: "b",
	},
	{
		question: "لحل المشاكل ",
		a: "تفكر خارج الصندوق",
		b: "تفضل الحلول المعتادة و تحاول اخذ نصيحة",

		correct: "b",
	},
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const answerButtonsContainer = document.getElementById("answer__buttons");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

answerButtonsContainer.addEventListener("click", function (event) {
	const clickedElement = event.target;
	const isRadioButton = clickedElement.classList.contains("answer");

	if (isRadioButton) {
		return;
	}

	const answerEls = clickedElement
		.closest(".btn-quiz")
		.querySelector(".answer");

	answerEls.checked = !answerEls.checked;
});

submitBtn.addEventListener("click", () => {
	const answer = getSelected();
	if (answer) {
		if (answer === quizData[currentQuiz].correct) {
			score++;
		}

		currentQuiz++;

		if (currentQuiz < quizData.length) {
			loadQuiz();
		} else {
			showResult();
		}
	}
});

function loadQuiz() {
	deselectAnswers();

	const currentQuizData = quizData[currentQuiz];

	questionEl.innerText = currentQuizData.question;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
}

function deselectAnswers() {
	answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
	let answer;
	answerEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});
	return answer;
}

function showResult() {
	const resultMapping = {
		15: "Business Development",
		14: "Finance",
		13: "Social Media Management",
		12: "Marketing",
		11: "Organizations",
		10: "E-Marketing",
		9: "Public Relations",
		8: "Project Management",
		7: "Human Resources",
		6: "Event Management",
		5: "Graphic Design",
		4: "Freelance Marketing",
		3: "Programming",
		2: "Educational Curricula Formation",
		1: "Scientific Research",
		0: "Freelance Marketing",
	};

	const resultScore = score.toString();

	if (resultMapping.hasOwnProperty(resultScore)) {
		quiz.innerHTML = `
			<h4 id="question" style="color: #fff; margin-bottom: 1.5rem;">
			${resultMapping[resultScore]}
            لقد حصلت على
			</h4>
			<button class="btn btn-primary" id="submit" onclick="location.reload()" style="margin-bottom: 0.5rem;">
				إعادة
			</button>

			<button class="btn btn-primary" id="submit" onclick="location.href='../home'">
				الصفحة الرئيسية
			</button>
		`;
	}
}
