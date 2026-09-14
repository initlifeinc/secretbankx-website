/**
 * SecretBankX 官网配置文件
 * 填写以下配置后，所有页面会自动更新
 */
const SBX_CONFIG = {
  // ── 基础信息 ──────────────────────────────────────────
  APP_NAME: "SecretBankX",
  TAGLINE: "Important information, ready when you need it.",
  TAGLINE_EN: "Important information, ready when you need it.",
  DESCRIPTION: "A local-first app for passwords and important personal information on Apple devices.",

  // ── 公司 / 团队信息 ────────────────────────────────────
  COMPANY_NAME: "InitLife",          // 开发者 / 公司名
  COMPANY_NAME_FULL: "InitLife",     // 法定全称（用于隐私政策、条款等）
  COPYRIGHT_YEAR: "2024",            // 版权起始年份
  WEBSITE_DOMAIN: "secretbankx.initlife.com", // 当前 GitHub Pages 正式域名（不含 https://）

  // ── 联系方式 ───────────────────────────────────────────
  CONTACT_EMAIL: "initlifeltd@gmail.com",  // 通用联系邮箱
  PRIVACY_EMAIL: "initlifeltd@gmail.com",  // 隐私问题邮箱
  JOBS_EMAIL: "initlifeltd@gmail.com",     // 招聘邮箱

  // ── 下载链接 ───────────────────────────────────────────
  APP_STORE_URL: "https://apps.apple.com/app/id6811630816",
  TESTFLIGHT_URL: "",       // TestFlight 内测链接（可选）

  // ── 代码仓库 / 社区 ────────────────────────────────────
  GITHUB_URL: "https://github.com/initlife/secretbankx",  // GitHub 主页
  TWITTER_URL: "",          // Twitter/X 链接（可选）
  TELEGRAM_URL: "",         // Telegram 频道（可选）

  // ── 功能特性（用于首页 Features 卡片）─────────────────
  FEATURES: [
    {
      icon: "🔐",
      title: "Encrypted Local Vaults",
      desc: "Your vault is encrypted on device, with access and recovery controls kept in your hands."
    },
    {
      icon: "🖥",
      title: "Native Apple Experience",
      desc: "Designed for iPhone, iPad, and Mac with familiar system interactions."
    },
    {
      icon: "🛡",
      title: "Secure Storage",
      desc: "Encrypted vault storage and device authentication help protect your information."
    },
    {
      icon: "📴",
      title: "Works Offline",
      desc: "Access local vaults when disconnected, with optional encrypted iCloud sync for your devices."
    },
    {
      icon: "🔄",
      title: "Multiple Vaults",
      desc: "Create separate encrypted vaults for work and personal information, each with its own password."
    },
    {
      icon: "🧩",
      title: "Clear Data Boundaries",
      desc: "Local storage, export, backup, and recovery are designed to stay understandable and under your control."
    }
  ],

  // ── 招聘职位（用于加入我们页面）─────────────────────
  OPEN_POSITIONS: [
    // {
    //   title: "iOS / macOS 工程师",
    //   type: "远程 · 全职",
    //   desc: "熟悉 SwiftUI，有 iOS/macOS 应用开发经验，对安全与隐私领域感兴趣。"
    // },
    // {
    //   title: "C++ 核心工程师",
    //   type: "远程 · 全职",
    //   desc: "精通现代 C++17/20，有跨平台库开发经验，了解密码学优先。"
    // }
  ]
};
