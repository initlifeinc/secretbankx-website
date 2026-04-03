window.LOCALES = window.LOCALES || {};
window.LOCALES.en = {
  // ── Navigation ────────────────────────────────────────
  nav: {
    features: "Features",
    security: "Security",
    privacy:  "Privacy Policy",
    terms:    "Terms of Service",
    careers:  "Careers",
    download: "Download",
    home:     "Home"
  },

  // ── Footer ────────────────────────────────────────────
  footer: {
    home:    "Home",
    privacy: "Privacy Policy",
    terms:   "Terms of Service",
    careers: "Careers",
    contact: "Contact",
    github:  "GitHub"
  },

  // ── Home Page ─────────────────────────────────────────
  home: {
    hero_badge:           "Local-First · Zero-Knowledge · Fully Offline",
    hero_title_main:      "Your Secrets.",
    hero_title_gradient:  "Only Yours.",
    hero_desc:            "A local-first, zero-knowledge password manager built natively for iOS, iPadOS, and macOS. No account. No server. No compromises.",
    btn_appstore:         "Download on App Store",
    btn_appstore_soon:    "Coming Soon",
    btn_github:           "GitHub",
    btn_testflight:       "TestFlight Beta",

    features_label: "Features",
    features_title: "Why SecretBankX?",
    features_desc:  "Designed for people who care about privacy. Every decision puts your data security first.",

    security_label: "Security Architecture",
    security_title: "Cryptographic-grade trust,\nnever compromised",
    security_p1:    "SecretBankX uses a dual-layer database architecture. User metadata and vault data are completely isolated. Vault databases are encrypted at the file level using SQLCipher.",
    security_p2:    "Your master password is never stored or transmitted in any form. All cryptographic operations happen locally on your device.",
    security_list: [
      "SQLCipher file-level AES-256 encryption",
      "Master password never leaves your device",
      "Zero server dependency — immune to man-in-the-middle attacks",
      "Biometric unlock (Face ID / Touch ID)",
      "Multiple Vaults with independent passwords",
      "Open, auditable C++17 encryption core"
    ],

    platforms_label: "Full Platform Support",
    platforms_title: "One Codebase. Three Native Apps.",
    platforms_desc:  "C++17 cross-platform core + SwiftUI native UI. A fluid, native experience on every Apple device.",
    platform_iphone:     "iPhone",
    platform_iphone_sub: "iOS 16+\nOptimized for compact layout",
    platform_ipad:       "iPad",
    platform_ipad_sub:   "iPadOS 16+\nMulti-column Split View",
    platform_mac:        "Mac",
    platform_mac_sub:    "macOS 13+\nNative Catalyst",

    cta_title: "Ready to take control of your digital security?",
    cta_desc:  "Free to download. One-time purchase. Yours forever. No subscriptions. No tricks.",

    features_items: [
      { icon: "🔐", title: "Zero-Knowledge Encryption", desc: "Your master password never leaves your device. All data is encrypted locally — even we can't read your content." },
      { icon: "🖥",  title: "Native on All Platforms",   desc: "Deeply optimized for iOS, iPadOS, and macOS. SwiftUI native interface — smooth, natural, zero compromises." },
      { icon: "🛡",  title: "Military-Grade Encryption", desc: "SQLCipher file encryption + AES-256 at the core, paired with biometric unlock for the perfect balance of security and convenience." },
      { icon: "📴",  title: "Fully Offline",             desc: "No internet required. No account needed. No server involved. Your data stays in your hands, always available." },
      { icon: "🔄",  title: "Multiple Vaults",           desc: "Create multiple independently encrypted vaults. Keep work and personal data completely separate, each with its own password." },
      { icon: "🧩",  title: "Open Architecture",         desc: "C++17 cross-platform core. Auditable code. No proprietary cloud dependency. Full data sovereignty." }
    ]
  },

  // ── Privacy Policy ────────────────────────────────────
  privacy: {
    page_title:      "Privacy Policy",
    meta_desc:       "SecretBankX Privacy Policy: how we protect your data.",
    h1:              "Privacy Policy",
    effective_date:  "January 1, 2024",
    updated_date:    "January 1, 2024",
    label_effective: "Effective Date: ",
    label_updated:   "Last Updated: ",

    highlight: "<strong>Core commitment:</strong> SecretBankX uses a local-first, zero-knowledge architecture. All passwords and account data you store exist only on your own device. We have no server that receives, stores, or can access your data.",

    s1_title: "1. Overview",
    s1_p1: 'This Privacy Policy explains how {{company}} ("we", "our") handles information when you use the SecretBankX application ("App"). We take your privacy seriously — it is a core principle behind every product decision we make.',

    s2_title: "2. Information We Collect",
    s2_1_title: "2.1 Information We Do Not Collect",
    s2_1_p1: "SecretBankX's local-first design means the following information never leaves your device:",
    s2_1_list: [
      "Any passwords, account names, notes, or other credentials you store",
      "Your master password or any derived keys",
      "The contents or structure of any Vault you create",
      "Any biometric data that could identify you"
    ],
    s2_2_title: "2.2 Information Processed Locally by the App",
    s2_2_p1: "To provide core functionality, the App processes the following information locally on your device. This information is never transmitted to us:",
    s2_2_list: [
      "<strong>Device Biometrics:</strong> Face ID or Touch ID authentication is handled entirely by Apple's system frameworks on-device. Only a success/failure result is returned; we cannot access raw biometric data.",
      "<strong>Local Storage:</strong> Encrypted Vault database files are stored in the App's sandboxed container, inaccessible to other apps.",
      "<strong>iCloud Backup (if enabled):</strong> If you have iCloud Backup enabled in iOS Settings, encrypted database files may be included in your backup. These files remain encrypted at all times. Apple's privacy policy governs that process."
    ],
    s2_3_title: "2.3 Information Collected via the App Store",
    s2_3_p1: "The App is distributed through the Apple App Store. Apple may collect anonymized usage statistics (e.g., crash reports, install counts) per its privacy policy. We may review aggregated, anonymized data Apple provides to improve the App, but this cannot be linked to any individual.",
    s2_4_title: "2.4 When You Contact Us",
    s2_4_p1: "If you contact us by email or other means, the information you provide (e.g., name, email address, feedback) will be used solely to respond to your inquiry. It will not be used for any other purpose or sold to third parties.",

    s3_title: "3. Data Storage & Security",
    s3_p1: "All your credential data is protected by the following measures:",
    s3_list: [
      "<strong>File-level encryption:</strong> Vault databases use SQLCipher with AES-256.",
      "<strong>Key derivation:</strong> Encryption keys are derived from your master password via PBKDF2 and are never stored in any form.",
      "<strong>Memory protection:</strong> Decryption keys reside in memory only while the App is active, and are cleared immediately upon locking.",
      "<strong>Sandbox isolation:</strong> Data files are stored within the App sandbox and cannot be accessed by other apps."
    ],
    s3_p2: "Because we never hold your data, there is no risk of a server breach exposing your passwords.",

    s4_title: "4. Data Sharing",
    s4_p1: "We do not sell, rent, or share your personal data with third parties in any form. We have no user database to share — we simply don't collect user data.",
    s4_p2: "The only exception is information you proactively send us when reaching out for support, which is used solely to respond to your inquiry.",

    s5_title: "5. Children's Privacy",
    s5_p1: "SecretBankX is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us using the details below.",

    s6_title: "6. Third-Party Services",
    s6_p1: "SecretBankX does not integrate any third-party analytics services, advertising networks, or tracking SDKs.",
    s6_p2: "All third-party open-source libraries used by the App (including SQLCipher, OpenSSL, nlohmann/json, etc.) run locally and transmit no data to any third party.",

    s7_title: "7. Your Rights",
    s7_p1: "Because we do not hold your personal data, you have complete control over it:",
    s7_list: [
      "<strong>Access & Export:</strong> Your data lives on your device and can be viewed at any time within the App.",
      "<strong>Deletion:</strong> Uninstalling the App or deleting a Vault within the App permanently removes the corresponding data.",
      "<strong>Portability:</strong> The App supports data export, allowing you to migrate at any time."
    ],
    s7_p2: "If you wish to have any email correspondence you've sent us deleted, please contact us at {{privacy_email}} and we will handle it within a reasonable timeframe.",

    s8_title: "8. Changes to This Policy",
    s8_p1: "We may update this Privacy Policy from time to time. When we do, we will update the 'Last Updated' date on this page and notify you appropriately within the App. Continued use of the App after notification constitutes acceptance of the updated policy. Material changes will be communicated via in-app notification or App Store release notes.",

    s9_title: "9. Contact Us",
    s9_p1: "If you have any questions about this Privacy Policy, please contact us:",
    s9_list_email: "Email: ",
    s9_list_dev:   "Developer: {{company}}"
  },

  // ── Terms of Service ──────────────────────────────────
  terms: {
    page_title:      "Terms of Service",
    meta_desc:       "SecretBankX Terms of Service: your rights and restrictions when using the App.",
    h1:              "Terms of Service",
    effective_date:  "January 1, 2024",
    updated_date:    "January 1, 2024",
    label_effective: "Effective Date: ",
    label_updated:   "Last Updated: ",

    highlight: "Please read these Terms carefully before using SecretBankX. By downloading, installing, or using the App you agree to be bound by these Terms.",

    s1_title: "1. Acceptance of Terms",
    s1_p1: 'These Terms of Service ("Terms") constitute a legal agreement between you and {{company}} ("we", "our") governing your use of the SecretBankX application ("App"). If you do not agree to these Terms, please do not use the App.',

    s2_title: "2. License Grant",
    s2_p1: "Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to download, install, and use the App on Apple devices you own or control, for personal, non-commercial use only.",
    s2_p2: "This license does not include the right to:",
    s2_list: [
      "Sell, rent, sublicense, or otherwise distribute the App",
      "Reverse engineer, decompile, or disassemble the App (except as expressly permitted by law)",
      "Modify the App or create derivative works based on it",
      "Circumvent any security features of the App in any way"
    ],

    s3_title: "3. App Store Terms",
    s3_p1: "SecretBankX is distributed through the Apple App Store. Your use of the App is also subject to the Apple Media Services Terms and Conditions. In the event of any conflict between these Terms and Apple's terms, Apple's terms will prevail (solely to the extent of the conflict).",

    s4_title: "4. Account & Security Responsibilities",
    s4_p1: "SecretBankX does not require you to create an account. You bear full responsibility for:",
    s4_list: [
      "<strong>Master Password:</strong> Your master password is the sole credential for accessing your data. If you forget your master password, we cannot recover your data — we have no server storing any keys.",
      "<strong>Data Backups:</strong> We strongly recommend regularly backing up your Vault data. Loss of a device, accidental data deletion, or App data removal may result in permanent data loss, for which we are not liable.",
      "<strong>Device Security:</strong> Keep your device and operating system up to date and prevent unauthorized physical access."
    ],

    s5_title: "5. Acceptable Use",
    s5_p1: "You agree not to use the App for any unlawful purpose, including but not limited to:",
    s5_list: [
      "Storing credentials for unauthorized access to systems belonging to others",
      "Circumventing applicable legal or regulatory requirements",
      "Any activity that violates applicable laws or regulations"
    ],

    s6_title: "6. Intellectual Property",
    s6_p1: "The App and all of its content, features, and functionality are owned by {{company}} or its licensors and are protected by copyright, trademark, and other intellectual property laws.",
    s6_p2: "Certain open-source components used by the App are licensed under their respective open-source licenses (e.g., MIT, BSD). License information is available in the App's About section.",

    s7_title: "7. Disclaimers",
    s7_p1: "<strong>The App is provided \"as is\" without warranties of any kind, express or implied.</strong> We expressly disclaim all warranties of merchantability, fitness for a particular purpose, and non-infringement.",
    s7_p2: "We do not warrant that:",
    s7_list: [
      "The App will be available at all times, uninterrupted, error-free, or virus-free",
      "The App will meet your specific needs or expectations",
      "Any errors in the App will be corrected"
    ],
    s7_p3: "<strong>Special note on data security:</strong> While we use industry-recognized encryption technology, no security system is completely impenetrable. You use this App to store data at your own risk.",

    s8_title: "8. Limitation of Liability",
    s8_p1: "To the fullest extent permitted by law, {{company}} and its affiliates, directors, employees, and agents shall not be liable for:",
    s8_list: [
      "Data loss resulting from a forgotten master password or lost device",
      "Any direct, indirect, incidental, special, or consequential damages arising from your use of or inability to use the App",
      "Damages resulting from unauthorized access to your device or data",
      "Any amount exceeding the fees you paid for the App in the 12 months preceding the incident"
    ],

    s9_title: "9. Changes to Terms",
    s9_p1: "We reserve the right to modify these Terms at any time. When we do, we will update the 'Last Updated' date on this page. Material changes will be communicated in advance via in-app notification or App Store release notes. Continued use of the App after notification constitutes acceptance of the revised Terms.",

    s10_title: "10. Termination",
    s10_p1: "You may terminate this agreement at any time by uninstalling the App. We reserve the right to terminate or suspend your access to the App at any time, without notice, if you breach these Terms. Upon termination, the license granted to you under these Terms will immediately cease, but provisions that by their nature should survive termination will remain in effect.",

    s11_title: "11. Governing Law",
    s11_p1: "These Terms are governed by and construed in accordance with the laws of the People's Republic of China (without regard to conflict of law principles). Any dispute arising from or related to these Terms or the App shall first be resolved through friendly negotiation; if negotiation fails, the dispute shall be submitted to a court of competent jurisdiction.",

    s12_title: "12. Entire Agreement",
    s12_p1: "These Terms and our Privacy Policy constitute the entire agreement between you and us regarding your use of the App and supersede all prior agreements and understandings on the same subject.",
    s12_privacy_link: "Privacy Policy",

    s13_title: "13. Contact Us",
    s13_p1: "If you have any questions about these Terms of Service, please contact us:",
    s13_list_email: "Email: ",
    s13_list_dev:   "Developer: {{company}}"
  },

  // ── Careers ───────────────────────────────────────────
  careers: {
    page_title:   "Careers",
    meta_desc:    "Join the SecretBankX team and help build the best password manager.",
    hero_badge:   "We're Growing",
    hero_title_1: "Join us to",
    hero_title_2: "redefine digital privacy",
    hero_desc:    "SecretBankX believes privacy is a fundamental right, not a paid feature. We're proving it with technology — and we need fellow believers.",

    values_label: "Our Values",
    values_title: "How We Work",
    values: [
      { icon: "🔒", title: "Privacy First",       desc: "Before every product decision, we ask: does this benefit the user's privacy and security? That's a non-negotiable baseline." },
      { icon: "🏗",  title: "Engineering Excellence", desc: "We build cross-platform cores in C++17 and craft native UIs with SwiftUI. Code quality isn't a slogan — it's daily practice." },
      { icon: "🌍",  title: "Remote & Async",     desc: "We're a distributed team. We believe in outcomes over attendance, deep work over pointless meetings." },
      { icon: "📖",  title: "Open & Transparent", desc: "Core architecture is auditable. Decisions are discussed openly. We're honest with our users and with each other." }
    ],

    positions_label: "Open Roles",
    positions_title: "Current Openings",
    btn_apply:       "Apply",
    apply_subject:   "Application: ",

    no_pos_title: "No Open Positions Right Now",
    no_pos_desc:  "We're not actively hiring, but we always welcome exceptional people to reach out. If you believe in what we're building, send us an email and tell us who you are.",
    no_pos_btn:   "Send an Email",

    open_title:   "Don't see a role that fits?",
    open_desc:    "We welcome open applications from talented people. Tell us what you can do, what you want to build, and why SecretBankX is the right fit for you.",
    open_btn:     "Send an Open Application",
    open_subject: "Open Application — "
  },

  // ── Language Switcher ─────────────────────────────────
  lang: {
    label: "Language",
    zh: "中文",
    en: "English"
  }
};
