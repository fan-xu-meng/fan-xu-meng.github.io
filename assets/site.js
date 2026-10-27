/* A single-URL bilingual homepage. Translations are kept in an inert
   HTML template in index.html; switching never navigates or reloads. */
(() => {
  const root = document.getElementById('home');
  const chinese = document.getElementById('zh-homepage-content');
  const toggle = document.getElementById('language-toggle');
  if (!root || !chinese || !toggle) return;

  const content = {
    en: root.innerHTML,
    zh: chinese.innerHTML
  };
  const nav = [...document.querySelectorAll('.top nav a')];
  const labels = {
    en: ['Home', 'Research', 'Publications', 'CV', 'Contact'],
    zh: ['首页', '研究方向', '论文', '履历', '联系']
  };
  const descriptions = {
    en: 'Fanxu Meng, PhD — Research Fellow at BEARS. Mechanistic electrochemistry, evidence-grounded AI and autonomous electrochemical discovery.',
    zh: 'Fanxu Meng 博士的学术主页，现任伯克利新加坡研究院研究员，研究方向包括电化学反应机制、基于科学证据的人工智能、AI 引导的电化学发现及实验室自动化。'
  };
  let language = 'en';
  let queued = false;

  function updateActiveNavigation() {
    queued = false;
    let id = 'home';
    for (const a of nav) {
      const section = document.querySelector(a.getAttribute('href'));
      if (section && section.getBoundingClientRect().top <= 160) id = section.id;
    }
    for (const a of nav) {
      const isActive = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
  }

  function bindPublicationFilters(saved) {
    const publications = [...root.querySelectorAll('.publication')];
    const search = root.querySelector('#pub-search');
    const year = root.querySelector('#year-filter');
    const lead = root.querySelector('#lead-filter');
    const counter = root.querySelector('#pub-counter');
    const empty = root.querySelector('#pub-empty');
    if (!search || !year || !lead || !counter || !empty) return;

    search.value = saved.search || '';
    year.value = saved.year || 'all';
    lead.setAttribute('aria-pressed', saved.lead ? 'true' : 'false');

    function refresh() {
      let shown = 0;
      const searchText = search.value.trim().toLowerCase();
      for (const paper of publications) {
        const matches = (!searchText || paper.dataset.search.includes(searchText))
          && (year.value === 'all' || paper.dataset.year === year.value)
          && (lead.getAttribute('aria-pressed') !== 'true' || paper.dataset.group !== 'collab');
        paper.hidden = !matches;
        if (matches) shown++;
      }
      for (const group of root.querySelectorAll('.publication-year,.pub-group')) {
        group.hidden = ![...group.querySelectorAll('.publication')].some(paper => !paper.hidden);
      }
      counter.textContent = language === 'zh'
        ? '已显示 ' + shown + ' / ' + publications.length + ' 篇论文'
        : shown + ' of ' + publications.length + ' publications';
      empty.hidden = shown !== 0;
    }

    search.addEventListener('input', refresh);
    year.addEventListener('change', refresh);
    lead.addEventListener('click', () => {
      lead.setAttribute('aria-pressed', lead.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      refresh();
    });
    refresh();
  }

  function changeLanguage(nextLanguage) {
    if (nextLanguage !== 'en' && nextLanguage !== 'zh') return;

    // Preserve publication search settings when the language changes.
    const currentSearch = root.querySelector('#pub-search');
    const currentYear = root.querySelector('#year-filter');
    const currentLead = root.querySelector('#lead-filter');
    const saved = {
      search: currentSearch ? currentSearch.value : '',
      year: currentYear ? currentYear.value : 'all',
      lead: currentLead ? currentLead.getAttribute('aria-pressed') === 'true' : false
    };
    const scrollTop = window.scrollY;
    language = nextLanguage;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    root.innerHTML = content[language];

    nav.forEach((a, index) => {
      if (labels[language][index]) a.textContent = labels[language][index];
    });
    toggle.textContent = language === 'zh' ? 'EN' : '中文';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    toggle.setAttribute('aria-pressed', String(language === 'zh'));
    document.title = language === 'zh'
      ? 'Fanxu Meng 博士｜学术主页'
      : 'Fanxu Meng, PhD | Academic Homepage';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = descriptions[language];
    const footerYear = root.querySelector('#footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    bindPublicationFilters(saved);
    updateActiveNavigation();
    try { window.localStorage.setItem('fanxu-site-language', language); } catch (_) {}
    // The URL and hash never change. Keep the reading position after replacing content.
    window.scrollTo({ top: scrollTop, behavior: 'instant' });
  }

  toggle.addEventListener('click', () => {
    changeLanguage(language === 'en' ? 'zh' : 'en');
  });
  window.addEventListener('scroll', () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(updateActiveNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveNavigation);

  let preferred = 'en';
  try {
    if (window.localStorage.getItem('fanxu-site-language') === 'zh') preferred = 'zh';
  } catch (_) {}
  changeLanguage(preferred);
})();