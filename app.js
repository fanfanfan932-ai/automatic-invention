const defaultWords = [
  { cn: "苹果", en: "apple" },
  { cn: "学校", en: "school" },
  { cn: "图书馆", en: "library" },
  { cn: "美丽的", en: "beautiful" },
  { cn: "学习", en: "study" },
  { cn: "重要的", en: "important" },
  { cn: "朋友", en: "friend" },
];

const storedWords = JSON.parse(localStorage.getItem("spellingWords") || "null");
const words = Array.isArray(storedWords) && storedWords.length > 0 ? storedWords : [...defaultWords];

let currentIndex = 0;
let score = 0;
let answered = false;

const progressEl = document.querySelector("#progress");
const scoreEl = document.querySelector("#score");
const promptEl = document.querySelector("#prompt");
const answerEl = document.querySelector("#answer");
const messageEl = document.querySelector("#message");
const checkBtn = document.querySelector("#checkBtn");
const hintBtn = document.querySelector("#hintBtn");
const nextBtn = document.querySelector("#nextBtn");
const addWordForm = document.querySelector("#addWordForm");
const cnInput = document.querySelector("#cnInput");
const enInput = document.querySelector("#enInput");

function persistWords() {
  localStorage.setItem("spellingWords", JSON.stringify(words));
}

function shuffle() {
  words.sort(() => Math.random() - 0.5);
}

function renderQuestion() {
  const item = words[currentIndex];
  progressEl.textContent = `第 ${currentIndex + 1} / ${words.length} 题`;
  scoreEl.textContent = `得分：${score}`;
  promptEl.textContent = item.cn;
  answerEl.value = "";
  answerEl.focus();
  answered = false;
  messageEl.textContent = "";
  messageEl.className = "message";
  nextBtn.disabled = true;
}

function normalize(text) {
  return text.trim().toLowerCase();
}

function checkAnswer() {
  if (answered) return;
  const userAnswer = normalize(answerEl.value);
  const target = normalize(words[currentIndex].en);

  if (!userAnswer) {
    messageEl.textContent = "请先输入单词。";
    messageEl.className = "message error";
    return;
  }

  answered = true;
  nextBtn.disabled = false;

  if (userAnswer === target) {
    score += 1;
    scoreEl.textContent = `得分：${score}`;
    messageEl.textContent = "✅ 正确！继续保持。";
    messageEl.className = "message success";
  } else {
    messageEl.textContent = `❌ 不正确，正确答案是：${words[currentIndex].en}`;
    messageEl.className = "message error";
  }
}

function showHint() {
  const answer = words[currentIndex].en;
  const first = answer[0];
  const masked = `${first}${"*".repeat(Math.max(answer.length - 1, 0))}`;
  messageEl.textContent = `提示：${masked}`;
  messageEl.className = "message";
}

function nextQuestion() {
  if (currentIndex < words.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    promptEl.textContent = "训练结束 🎉";
    progressEl.textContent = `已完成 ${words.length} 题`;
    messageEl.textContent = `最终得分：${score} / ${words.length}`;
    messageEl.className = "message success";
    answerEl.value = "";
    answerEl.disabled = true;
    checkBtn.disabled = true;
    hintBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

function addWord(event) {
  event.preventDefault();
  const cn = cnInput.value.trim();
  const en = enInput.value.trim().toLowerCase();

  if (!cn || !en) return;

  words.push({ cn, en });
  persistWords();

  cnInput.value = "";
  enInput.value = "";

  messageEl.textContent = `已添加单词：${cn} - ${en}`;
  messageEl.className = "message success";
}

checkBtn.addEventListener("click", checkAnswer);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", nextQuestion);
answerEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkAnswer();
});
addWordForm.addEventListener("submit", addWord);

shuffle();
renderQuestion();
