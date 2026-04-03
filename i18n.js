/**
 * SecretBankX i18n Engine
 * - 支持语言：zh（中文）、en（英文），可按需扩展
 * - 检测顺序：localStorage → navigator.language → 默认 zh
 * - 新增语言：在 i18n/ 目录添加 <lang>.js，在 SUPPORTED 中注册即可
 */
(function() {
  var SUPPORTED = ['zh', 'en'];
  var DEFAULT   = 'zh';

  // ── 语言检测 ─────────────────────────────────────────
  function detectLang() {
    // 1. 用户上次选择
    var saved = localStorage.getItem('sbx_lang');
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    // 2. 浏览器语言
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('en')) return 'en';
    // 3. 默认
    return DEFAULT;
  }

  // ── 深层取值 (dot-notation) ──────────────────────────
  function get(obj, path) {
    return path.split('.').reduce(function(o, k) {
      return o && o[k] !== undefined ? o[k] : undefined;
    }, obj);
  }

  // ── 插值替换 {{key}} ─────────────────────────────────
  function interpolate(str, vars) {
    if (!vars || typeof str !== 'string') return str;
    return str.replace(/\{\{(\w+)\}\}/g, function(_, key) {
      return vars[key] !== undefined ? vars[key] : '{{' + key + '}}';
    });
  }

  // ── 核心 API ─────────────────────────────────────────
  var I18n = {
    locale: DEFAULT,
    strings: {},

    init: function(lang) {
      var locales = window.LOCALES || {};
      var chosen = (lang && SUPPORTED.indexOf(lang) !== -1) ? lang : detectLang();
      this.locale  = chosen;
      this.strings = locales[chosen] || locales[DEFAULT] || {};
      localStorage.setItem('sbx_lang', chosen);
      document.documentElement.lang = chosen === 'zh' ? 'zh-Hans' : chosen;
    },

    // t('home.hero_title_main') → string
    t: function(key, vars) {
      var val = get(this.strings, key);
      if (val === undefined) {
        // 回退到另一种语言
        var fallback = window.LOCALES && window.LOCALES[DEFAULT];
        val = fallback ? get(fallback, key) : key;
      }
      if (typeof val === 'string') return interpolate(val, vars);
      return val; // array / object — caller handles
    },

    // 切换语言并刷新页面（最简单可靠的方式）
    setLang: function(lang) {
      if (SUPPORTED.indexOf(lang) === -1) return;
      localStorage.setItem('sbx_lang', lang);
      location.reload();
    },

    // 更新所有带 data-i18n 属性的 DOM 节点
    applyDOM: function() {
      var self = this;
      var cfg  = window.SBX_CONFIG || {};

      // 插值变量池（from config）
      var vars = {
        company:       cfg.COMPANY_NAME_FULL || cfg.COMPANY_NAME || '',
        app_name:      cfg.APP_NAME || '',
        privacy_email: cfg.PRIVACY_EMAIL || cfg.CONTACT_EMAIL || '',
        contact_email: cfg.CONTACT_EMAIL || ''
      };

      // textContent
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var val = self.t(el.getAttribute('data-i18n'), vars);
        if (typeof val === 'string') el.textContent = val;
      });

      // innerHTML（允许 <strong>、<br> 等）
      document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        var val = self.t(el.getAttribute('data-i18n-html'), vars);
        if (typeof val === 'string') el.innerHTML = val;
      });

      // href
      document.querySelectorAll('[data-i18n-href]').forEach(function(el) {
        var val = self.t(el.getAttribute('data-i18n-href'), vars);
        if (typeof val === 'string') el.href = val;
      });

      // <title> & meta description
      var titleKey = document.documentElement.getAttribute('data-page-title-key');
      if (titleKey) {
        var appName = cfg.APP_NAME || 'SecretBankX';
        var pageTitle = self.t(titleKey);
        document.title = pageTitle ? pageTitle + ' — ' + appName : appName;
      }
      var descEl = document.querySelector('meta[name="description"]');
      var descKey = descEl && descEl.getAttribute('data-i18n-content');
      if (descEl && descKey) {
        var descVal = self.t(descKey, vars);
        if (descVal) descEl.setAttribute('content', descVal);
      }
    },

    // 语言切换器高亮
    updateSwitcher: function() {
      var self = this;
      document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
        var lang = btn.getAttribute('data-lang-btn');
        btn.classList.toggle('active', lang === self.locale);
      });
    }
  };

  window.I18n = I18n;
  window.setLang = function(l) { I18n.setLang(l); };
})();
