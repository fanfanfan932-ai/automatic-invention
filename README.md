# 蓝色畅想合唱团 Demo（Web + App + Server）

这是一个用于演示招生流程的可点击原型项目，包含：

- **Web 官网**（React + Vite + Tailwind + React Router）
- **移动端 App Demo**（React Native + Expo + Expo Router）
- **Node.js Mock 后端**（Express + 本地 JSON）

## 1) 项目结构

```txt
automatic-invention/
├── web/                    # 官网 demo
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── SuccessAlert.jsx
│   │   ├── lib/api.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── TrialPage.jsx
│   │   │   ├── ShowcasePage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── app/                    # Expo App demo
│   ├── package.json
│   ├── app/
│   │   ├── _layout.jsx
│   │   ├── index.jsx
│   │   ├── register.jsx
│   │   ├── trial.jsx
│   │   └── showcase.jsx
│   └── src/
│       ├── components/
│       │   ├── Card.jsx
│       │   └── InputField.jsx
│       └── lib/api.js
└── server/                 # Express mock API
    ├── package.json
    ├── index.js
    └── data/
        ├── mockData.json
        └── records.json
```

## 2) 一键启动（分步命令）

> 建议开 3 个终端窗口，分别运行 server / web / app。

### 启动后端

```bash
cd server
npm install
npm run dev
```

默认地址：`http://localhost:3001`

### 启动 Web

```bash
cd web
npm install
npm run dev
```

默认地址：`http://localhost:5173`

### 启动 App（Expo）

```bash
cd app
npm install
npx expo start
```

扫码可在手机 Expo Go 中查看，或使用 iOS/Android 模拟器。

## 3) 功能覆盖说明

### Web（完整）
- 首页：品牌介绍 + 招生按钮 + 试听预约入口
- 报名页：姓名、年龄、声部、家长手机号，Zod 校验，提交成功反馈
- 试听预约页：日期 + 时间段 + 家长手机号，提交成功反馈
- 展示页：师资、演出图片（占位图）、获奖文案（mock）
- 管理后台：报名列表、预约列表、统计卡片

### App（同步核心流程）
- 首页、报名、试听预约、展示页面完整可跳转
- 表单具备 Zod 校验并弹窗提示提交成功
- 保持蓝色系、儿童友好风格

## 4) 三张关键页面结构说明（文字）

1. **首页（Web/App）**  
   顶部品牌标题 + 简介文案；中部提供“立即报名”和“预约试听课”主按钮；下方展示演出形象图；引导用户进入招生漏斗。

2. **报名页（Web/App）**  
   采用卡片式表单，字段为孩子姓名、年龄、声部、家长手机号；底部主操作按钮“提交报名”；提交后显示“报名成功”反馈。

3. **管理后台（Web）**  
   顶部两张统计卡片（报名人数、预约人数）；下方左右分栏展示报名列表与预约列表；用于管理者快速掌握招生与预约进度。

## 5) Mock 数据和占位资源

- 内容数据：`server/data/mockData.json`
- 报名和预约数据：`server/data/records.json`
- 图片：使用 `https://placehold.co` 占位图链接

## 6) 演示流程建议

- Web 流程：**首页 → 报名页 → 提交成功提示 → 返回首页**
- App 流程：**首页 → 报名页 → 提交成功提示 → 返回首页**
- 适用于：融资演示、对外招生展示、内部产品讨论原型。
