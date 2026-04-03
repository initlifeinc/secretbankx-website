/**
 * SecretBankX 官网配置文件
 * 填写以下配置后，所有页面会自动更新
 */
const SBX_CONFIG = {
  // ── 基础信息 ──────────────────────────────────────────
  APP_NAME: "SecretBankX",
  TAGLINE: "你的秘密，只属于你",
  TAGLINE_EN: "Your Secrets. Only Yours.",
  DESCRIPTION: "本地优先的零知识密码管理器，适用于 iOS、iPadOS 与 macOS。无服务器，无泄露风险。",

  // ── 公司 / 团队信息 ────────────────────────────────────
  COMPANY_NAME: "InitLife",          // 开发者 / 公司名
  COMPANY_NAME_FULL: "InitLife",     // 法定全称（用于隐私政策、条款等）
  COPYRIGHT_YEAR: "2024",            // 版权起始年份
  WEBSITE_DOMAIN: "secretbankx.initlife.com", // 你的域名（不含 https://）

  // ── 联系方式 ───────────────────────────────────────────
  CONTACT_EMAIL: "initlifeltd@gmail.com",       // 通用联系邮箱
  PRIVACY_EMAIL: "initlifeltd@gmail.com",  // 隐私问题邮箱
  JOBS_EMAIL: "initlifeltd@gmail.com",        // 招聘邮箱

  // ── 下载链接 ───────────────────────────────────────────
  APP_STORE_URL: "",        // App Store 链接（上线后填写）
  TESTFLIGHT_URL: "",       // TestFlight 内测链接（可选）

  // ── 代码仓库 / 社区 ────────────────────────────────────
  GITHUB_URL: "https://github.com/initlifeinc/secretbankx-website",  // GitHub 主页
  TWITTER_URL: "",          // Twitter/X 链接（可选）
  TELEGRAM_URL: "",         // Telegram 频道（可选）

  // ── 功能特性（用于首页 Features 卡片）─────────────────
  FEATURES: [
    {
      icon: "🔐",
      title: "零知识加密",
      desc: "主密码永远不离开你的设备。所有数据在本地完成加密，即使是我们也无法读取你的内容。"
    },
    {
      icon: "🖥",
      title: "全平台原生体验",
      desc: "专为 iOS、iPadOS 和 macOS 深度定制，SwiftUI 原生界面，流畅自然，无任何妥协。"
    },
    {
      icon: "🛡",
      title: "军事级加密算法",
      desc: "底层采用 SQLCipher 文件加密 + AES-256，结合生物识别快速解锁，安全与便利兼得。"
    },
    {
      icon: "📴",
      title: "完全离线可用",
      desc: "无需网络，无需账号，无需服务器。你的数据永远在你手中，随时可用。"
    },
    {
      icon: "🔄",
      title: "多 Vault 管理",
      desc: "支持创建多个独立加密保险库，工作与个人数据彻底隔离，各自设置不同密码。"
    },
    {
      icon: "🧩",
      title: "开放架构",
      desc: "C++17 跨平台核心，代码可审计，不依赖任何私有云服务，你的数据主权完全在你。"
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
