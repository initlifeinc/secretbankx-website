/* No analytics, remote fonts, or network requests. Language preference stays here. */
(() => {
  const url = new URL(location.href);
  const explicit = url.searchParams.get('lang');
  let saved;
  try { saved = localStorage.getItem('sbx_lang_manual'); } catch (_) {}
  const english = location.pathname.startsWith('/en/');
  const path = location.pathname.replace(/^\/en\//, '/');
  const browserLanguage = (navigator.languages || [navigator.language]).some(l => /^zh/i.test(l)) ? 'zh' : 'en';
  const chosen = ['en', 'zh'].includes(explicit) ? explicit : saved || browserLanguage;
  if (explicit) { try { localStorage.setItem('sbx_lang_manual', chosen); } catch (_) {} }
  // Stable Chinese paths detect language; explicit /en/ links remain shareable.
  if ((explicit === 'zh' && english) || (!english && chosen === 'en' && (explicit || !/404/.test(document.title)))) {
    url.pathname = chosen === 'en' ? '/en' + path : path;
    location.replace(url.href);
    return;
  }
  document.querySelectorAll('[data-language]').forEach(link => link.addEventListener('click', () => {
    try { localStorage.setItem('sbx_lang_manual', link.dataset.language); } catch (_) {}
  }));
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  function close() { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); menu?.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) close(); });
})();
