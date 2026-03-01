const moduleData = [
  {
    name: "招生 & 报名",
    points: ["线上报名表", "试听课预约", "线上缴费/定金", "自动短信/微信提醒"],
  },
  {
    name: "品牌展示",
    points: ["合唱团介绍", "师资与教学理念", "演出图文视频", "获奖与成果展示"],
  },
  {
    name: "课程管理",
    points: ["课程表", "上课提醒", "请假流程", "补课申请"],
  },
  {
    name: "学员系统",
    points: ["学员档案", "分团/声部管理", "出勤记录", "老师评语"],
  },
  {
    name: "家校沟通",
    points: ["公告通知", "演出提醒", "私信家长", "群消息"],
  },
  {
    name: "后台管理",
    points: ["报名转化率", "财务数据", "课程与教师管理", "报表统计"],
  },
];

const prototypeData = [
  {
    title: "首页（家长端）",
    items: [
      "顶部轮播：近期演出、获奖信息、试听引导",
      "核心入口：报名、试听预约、课程表、公告",
      "品牌信任区：师资认证、合作单位、家长评价",
    ],
  },
  {
    title: "报名页",
    items: [
      "3 步表单：学员信息 → 音乐基础 → 联系方式",
      "时间段选择器：试听课预约，显示剩余名额",
      "支付模块：微信支付定金 + 自动通知",
    ],
  },
  {
    title: "课程页",
    items: [
      "周/月视图课程表，颜色区分团组与声部",
      "一键请假、补课申请、状态跟踪",
      "课前提醒 + 课后老师评语回执",
    ],
  },
  {
    title: "管理后台",
    items: [
      "招生漏斗：线索数、报名率、试听到课率",
      "学员管理：档案、分班、出勤与续费预警",
      "运营中心：公告发布、教师账号权限、财务概览",
    ],
  },
];

const architectureData = [
  {
    title: "前端",
    value: "Flutter（iOS/Android 一套代码） + 管理端 React + Ant Design",
  },
  {
    title: "后端",
    value: "NestJS / Spring Boot，提供统一 RESTful API 与权限服务",
  },
  {
    title: "数据库",
    value: "MySQL（核心业务）+ Redis（缓存/会话）+ OSS（图片视频）",
  },
  {
    title: "集成能力",
    value: "微信登录、微信支付、短信网关、个推/极光推送",
  },
  {
    title: "部署",
    value: "Docker + Kubernetes（可选）+ CI/CD，支持分环境发布",
  },
  {
    title: "可扩展",
    value: "在线课堂、视频点播、作品评分系统通过独立服务扩展",
  },
];

const mvpItems = [
  "微信登录 + 家长注册",
  "招生展示页（机构介绍/师资/演出成果）",
  "线上报名表 + 试听预约",
  "微信定金支付 + 报名确认通知",
  "课程表查看 + 上课提醒",
  "请假申请 + 管理员审核",
  "学员档案与出勤记录",
  "公告通知与单聊私信",
  "后台基础数据看板（招生数、到课率、缴费）",
];

const timelineData = [
  ["需求梳理 & 原型", "1-2 周", "PRD、信息架构、交互原型", "产品经理 1 + UI/UX 1"],
  ["视觉设计 & 技术预研", "1-2 周", "高保真视觉稿、技术选型与接口定义", "UI 1 + 架构/后端 1"],
  ["MVP 开发", "4-6 周", "家长端核心流程 + 管理后台基础模块", "前端 2 + 后端 2 + 测试 1"],
  ["联调测试 & 上线", "2 周", "支付/推送联调、灰度发布、上线", "前后端 + 测试 + 运维"],
  ["首月运营优化", "持续 4 周", "数据复盘、转化优化、功能迭代", "产品 1 + 开发 2"],
];

const budgetData = [
  {
    level: "低配方案",
    range: "¥8万 - ¥15万",
    desc: "快速 MVP：核心报名 + 课程 + 简版后台，适合先验证招生转化。",
  },
  {
    level: "中配方案（推荐）",
    range: "¥18万 - ¥35万",
    desc: "完整招生闭环 + 家校沟通 + 数据看板，兼顾品牌展示与管理效率。",
  },
  {
    level: "高配方案",
    range: "¥40万 - ¥80万+",
    desc: "加入在线课堂、视频课、作品评分和精细化运营体系，支持多校区扩张。",
  },
];

function renderList(list) {
  return `<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderModuleMap() {
  const grid = document.querySelector("#moduleGrid");
  grid.innerHTML = moduleData
    .map(
      (module) => `
        <article class="module-item">
          <h3>${module.name}</h3>
          ${renderList(module.points)}
        </article>
      `,
    )
    .join("");
}

function renderPrototypeCards() {
  const grid = document.querySelector("#prototypeGrid");
  grid.innerHTML = prototypeData
    .map(
      (section) => `
        <article class="proto-item">
          <h3>${section.title}</h3>
          ${renderList(section.items)}
        </article>
      `,
    )
    .join("");
}

function renderArchitecture() {
  const grid = document.querySelector("#architectureGrid");
  grid.innerHTML = architectureData
    .map(
      (item) => `
        <article class="arch-item">
          <h3>${item.title}</h3>
          <p>${item.value}</p>
        </article>
      `,
    )
    .join("");
}

function renderMvp() {
  const list = document.querySelector("#mvpList");
  list.innerHTML = mvpItems.map((item) => `<li>${item}</li>`).join("");
}

function renderTimeline() {
  const tbody = document.querySelector("#timelineBody");
  tbody.innerHTML = timelineData
    .map(
      ([phase, duration, output, staffing]) => `
        <tr>
          <td>${phase}</td>
          <td>${duration}</td>
          <td>${output}</td>
          <td>${staffing}</td>
        </tr>
      `,
    )
    .join("");
}

function renderBudget() {
  const cards = document.querySelector("#budgetCards");
  cards.innerHTML = budgetData
    .map(
      (item) => `
        <article class="budget-item">
          <h3>${item.level}</h3>
          <p class="budget-range">${item.range}</p>
          <p>${item.desc}</p>
        </article>
      `,
    )
    .join("");
}

renderModuleMap();
renderPrototypeCards();
renderArchitecture();
renderMvp();
renderTimeline();
renderBudget();
