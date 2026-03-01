const seedWords = [
  {
    en: "abandon",
    phonetic: "/əˈbændən/",
    cn: "放弃；抛弃",
    pos: "v.",
    collocation: "abandon hope",
    example: "Many students abandon bad habits before the exam.",
    freq: "高频"
  },
  {
    en: "allocate",
    phonetic: "/ˈæləkeɪt/",
    cn: "分配",
    pos: "v.",
    collocation: "allocate time to",
    example: "You should allocate enough time to vocabulary review.",
    freq: "高频"
  },
  {
    en: "compel",
    phonetic: "/kəmˈpel/",
    cn: "迫使",
    pos: "v.",
    collocation: "compel sb. to do",
    example: "Deadlines compel us to stay focused.",
    freq: "中频"
  },
  {
    en: "derive",
    phonetic: "/dɪˈraɪv/",
    cn: "得出；源于",
    pos: "v.",
    collocation: "derive from",
    example: "Confidence derives from repeated practice.",
    freq: "中频"
  },
  {
    en: "fluctuate",
    phonetic: "/ˈflʌktʃueɪt/",
    cn: "波动",
    pos: "v.",
    collocation: "prices fluctuate",
    example: "Your mock-test score may fluctuate at first.",
    freq: "低频"
  },
  {
    en: "hypothesis",
    phonetic: "/haɪˈpɒθəsɪs/",
    cn: "假设",
    pos: "n.",
    collocation: "test a hypothesis",
    example: "The passage asks readers to challenge the hypothesis.",
    freq: "高频"
  },
  {
    en: "inevitable",
    phonetic: "/ɪnˈevɪtəbl/",
    cn: "不可避免的",
    pos: "adj.",
    collocation: "an inevitable trend",
    example: "Review is an inevitable part of language learning.",
    freq: "高频"
  },
  {
    en: "justify",
    phonetic: "/ˈdʒʌstɪfaɪ/",
    cn: "证明…有道理",
    pos: "v.",
    collocation: "justify the decision",
    example: "Data can justify your conclusion.",
    freq: "中频"
  }
];

const STORAGE_KEY = "kaoyan-vocab-state-v2";
const defaultState = {
  progress: {},
  wrongBook: {},
  favorites: {},
  streak: 0,
  lastStudyDate: "",
  dailyPlan: 50,
  theme: "light"
};

const state = { ...defaultState, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")) };
state.dailyPlan = Number(state.dailyPlan) || 50;

const words = buildVocabulary(seedWords, 12000);
let studyIndex = 0;
let spellingIndex = 0;
let spellingScore = 0;
let quizScore = 0;
let quizMode = "meaning";
let currentQuiz = null;

const tabs = document.querySelectorAll(".tabs button");
const panels = document.querySelectorAll(".panel");
const dailyPlanEl = document.querySelector("#dailyPlan");
const themeToggle = document.querySelector("#themeToggle");

const wordCard = document.querySelector("#wordCard");
const studyProgress = document.querySelector("#studyProgress");
const wordImportance = document.querySelector("#wordImportance");
const cardWord = document.querySelector("#cardWord");
const cardPhonetic = document.querySelector("#cardPhonetic");
const cardMeaning = document.querySelector("#cardMeaning");
const cardPos = document.querySelector("#cardPos");
const cardCollocation = document.querySelector("#cardCollocation");
const cardExample = document.querySelector("#cardExample");
const favoriteBtn = document.querySelector("#favoriteBtn");

const spellingProgress = document.querySelector("#spellingProgress");
const spellingScoreEl = document.querySelector("#spellingScore");
const spellingPrompt = document.querySelector("#spellingPrompt");
const spellingInput = document.querySelector("#spellingInput");
const spellingMessage = document.querySelector("#spellingMessage");
const nextSpellingBtn = document.querySelector("#nextSpelling");

const quizTypeEl = document.querySelector("#quizType");
const quizScoreEl = document.querySelector("#quizScore");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const quizMessage = document.querySelector("#quizMessage");
const nextQuizBtn = document.querySelector("#nextQuiz");

function buildVocabulary(base, targetSize) {
  const list = [];
  for (let i = 0; i < targetSize; i += 1) {
    const source = base[i % base.length];
    list.push({
      ...source,
      id: `w_${i + 1}`,
      en: i < base.length ? source.en : `${source.en}_${Math.floor(i / base.length)}`,
      synthetic: i >= base.length
    });
  }
  return list;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(text) {
  return text.trim().toLowerCase();
}

function levelToInterval(level = 0) {
  return [1, 1, 2, 4, 7][Math.max(0, Math.min(level, 4))];
}

function touchStudy() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastStudyDate !== today) {
    const prev = new Date(state.lastStudyDate || today);
    const now = new Date(today);
    const dayGap = Math.round((now - prev) / 86400000);
    state.streak = dayGap === 1 ? state.streak + 1 : 1;
    state.lastStudyDate = today;
  }
  persist();
}

function getRecord(id) {
  if (!state.progress[id]) {
    state.progress[id] = { level: 0, seen: 0, dueAt: Date.now() };
  }
  return state.progress[id];
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  state.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️ 浅色模式" : "🌙 深色模式";
  persist();
}

function renderStudy() {
  const word = words[studyIndex % words.length];
  const record = getRecord(word.id);
  const seenToday = Object.values(state.progress).filter((item) => {
    const date = new Date(item.dueAt).toISOString().slice(0, 10);
    return date === new Date().toISOString().slice(0, 10);
  }).length;

  studyProgress.textContent = `今日进度：${Math.min(seenToday, state.dailyPlan)} / ${state.dailyPlan}`;
  wordImportance.textContent = `重要度：${word.freq}`;
  cardWord.textContent = word.en;
  cardPhonetic.textContent = word.phonetic;
  cardMeaning.textContent = `释义：${word.cn}`;
  cardPos.textContent = `词性：${word.pos}`;
  cardCollocation.textContent = `搭配：${word.collocation}`;
  cardExample.textContent = `例句：${word.example}`;
  favoriteBtn.textContent = state.favorites[word.id] ? "★ 已收藏" : "☆ 收藏";
  wordCard.classList.remove("flipped");
  if (record.level <= 1) {
    state.wrongBook[word.id] = true;
  }
  persist();
}

function markLevel(level) {
  const word = words[studyIndex % words.length];
  const record = getRecord(word.id);
  record.level = level;
  record.seen += 1;
  record.dueAt = Date.now() + levelToInterval(level) * 86400000;
  if (level >= 3) {
    delete state.wrongBook[word.id];
  } else {
    state.wrongBook[word.id] = true;
  }
  touchStudy();
  persist();
  renderStats();
  renderReview();
  nextStudy();
}

function nextStudy() {
  studyIndex = (studyIndex + 1) % words.length;
  renderStudy();
}

function renderSpelling() {
  const word = words[spellingIndex % words.length];
  spellingProgress.textContent = `第 ${spellingIndex + 1} / ${Math.min(words.length, 20)} 题`;
  spellingScoreEl.textContent = `得分：${spellingScore}`;
  spellingPrompt.textContent = `${word.cn}（${word.pos}）`;
  spellingInput.value = "";
  spellingMessage.textContent = "";
  nextSpellingBtn.disabled = true;
}

function checkSpelling() {
  const word = words[spellingIndex % words.length];
  const answer = normalize(spellingInput.value);
  if (!answer) {
    spellingMessage.textContent = "请先输入答案。";
    spellingMessage.className = "message error";
    return;
  }
  nextSpellingBtn.disabled = false;
  if (answer === normalize(word.en)) {
    spellingScore += 1;
    spellingScoreEl.textContent = `得分：${spellingScore}`;
    spellingMessage.textContent = "✅ 拼写正确";
    spellingMessage.className = "message success";
  } else {
    state.wrongBook[word.id] = true;
    persist();
    spellingMessage.textContent = `❌ 正确答案：${word.en}`;
    spellingMessage.className = "message error";
  }
  renderStats();
  renderReview();
}

function nextSpelling() {
  spellingIndex = (spellingIndex + 1) % 20;
  renderSpelling();
}

function sampleOptions(correct, useMeaning = true) {
  const pool = words.slice(0, 120).filter((item) => item.id !== correct.id);
  const choices = [correct];
  while (choices.length < 4 && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    choices.push(pool.splice(index, 1)[0]);
  }
  return choices.sort(() => Math.random() - 0.5).map((choice) => ({
    label: useMeaning ? choice.cn : choice.en,
    correct: choice.id === correct.id
  }));
}

function renderQuiz() {
  const word = words[Math.floor(Math.random() * 120)];
  const meaningMode = quizMode === "meaning";
  currentQuiz = {
    answer: meaningMode ? word.cn : word.en,
    word
  };
  quizTypeEl.textContent = `模式：${meaningMode ? "释义选择" : "句子选词"}`;
  quizQuestion.textContent = meaningMode
    ? `请选择单词 ${word.en} 的正确中文释义。`
    : `请选择能填入句子的单词：${word.example.replace(word.en, "____")}`;
  quizOptions.innerHTML = "";
  sampleOptions(word, meaningMode).forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = option.label;
    btn.addEventListener("click", () => handleQuiz(option.correct, option.label));
    quizOptions.appendChild(btn);
  });
  nextQuizBtn.disabled = true;
  quizMessage.textContent = "";
}

function handleQuiz(isCorrect, label) {
  nextQuizBtn.disabled = false;
  if (isCorrect) {
    quizScore += 1;
    quizScoreEl.textContent = `得分：${quizScore}`;
    quizMessage.textContent = `✅ 正确：${label}`;
    quizMessage.className = "message success";
  } else {
    state.wrongBook[currentQuiz.word.id] = true;
    persist();
    quizMessage.textContent = `❌ 错误，正确答案：${currentQuiz.answer}`;
    quizMessage.className = "message error";
  }
  renderStats();
  renderReview();
}

function renderReview() {
  const summary = document.querySelector("#reviewSummary");
  const list = document.querySelector("#reviewList");
  const now = Date.now();
  const dueWords = words
    .filter((word) => (state.progress[word.id]?.dueAt || 0) <= now)
    .slice(0, 20);

  summary.textContent = `待复习：${dueWords.length} 词（错词本：${Object.keys(state.wrongBook).length}）`;
  list.innerHTML = "";
  dueWords.forEach((word) => {
    const li = document.createElement("li");
    const level = state.progress[word.id]?.level ?? 0;
    li.textContent = `${word.en} - ${word.cn}（熟练度：${["陌生", "模糊", "熟悉", "掌握"][Math.min(level, 3)]}）`;
    list.appendChild(li);
  });
}

function renderStats() {
  const mastered = Object.values(state.progress).filter((item) => item.level >= 3).length;
  const seen = Object.keys(state.progress).length || 1;
  document.querySelector("#streakStat").textContent = `${state.streak} 天`;
  document.querySelector("#masteryStat").textContent = `${Math.round((mastered / seen) * 100)}%`;
  document.querySelector("#wrongCountStat").textContent = Object.keys(state.wrongBook).length;
  document.querySelector("#vocabCountStat").textContent = `${words.length.toLocaleString()} 词`;
  document.querySelector("#trendText").textContent = `最近训练正确率：${Math.round((spellingScore + quizScore) / Math.max(spellingIndex + 1, 1) * 100)}%（持续复习可降低错误率）`;
}

function switchTab(target) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === target));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
}

tabs.forEach((tab) => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
wordCard.addEventListener("click", () => wordCard.classList.toggle("flipped"));
wordCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") wordCard.classList.toggle("flipped");
});
document.querySelector("#speakBtn").addEventListener("click", () => {
  const utter = new SpeechSynthesisUtterance(words[studyIndex % words.length].en);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
});
document.querySelector("#markUnknown").addEventListener("click", () => markLevel(0));
document.querySelector("#markVague").addEventListener("click", () => markLevel(1));
document.querySelector("#markFamiliar").addEventListener("click", () => markLevel(2));
document.querySelector("#markMastered").addEventListener("click", () => markLevel(3));
document.querySelector("#nextStudy").addEventListener("click", nextStudy);

favoriteBtn.addEventListener("click", () => {
  const word = words[studyIndex % words.length];
  state.favorites[word.id] = !state.favorites[word.id];
  persist();
  renderStudy();
});

document.querySelector("#checkSpelling").addEventListener("click", checkSpelling);
document.querySelector("#hintSpelling").addEventListener("click", () => {
  const answer = words[spellingIndex % words.length].en;
  spellingMessage.textContent = `提示：${answer[0]}${"*".repeat(Math.max(answer.length - 1, 0))}`;
  spellingMessage.className = "message";
});
nextSpellingBtn.addEventListener("click", nextSpelling);
spellingInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkSpelling();
});

document.querySelector("#toggleQuizType").addEventListener("click", () => {
  quizMode = quizMode === "meaning" ? "sentence" : "meaning";
  renderQuiz();
});
document.querySelector("#nextQuiz").addEventListener("click", renderQuiz);

dailyPlanEl.value = String(state.dailyPlan);
dailyPlanEl.addEventListener("change", () => {
  state.dailyPlan = Number(dailyPlanEl.value);
  persist();
  renderStudy();
});

themeToggle.addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));

setTheme(state.theme);
renderStudy();
renderSpelling();
renderQuiz();
renderReview();
renderStats();
