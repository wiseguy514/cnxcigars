(function(){
  var STORE_KEY = 'cnx_lang';
  var SESSION_KEY = 'cnx_lang_redirected';

  var path = window.location.pathname;
  var parts = path.split('/').filter(Boolean);
  var lang = 'en', file = 'index.html';
  if (parts[0] === 'th' || parts[0] === 'zh') {
    lang = parts[0];
    file = parts[1] || 'index.html';
  } else {
    file = parts[0] || 'index.html';
  }

  var hrefFor = {
    en: file === 'index.html' ? '/' : '/' + file,
    th: '/th/' + (file === 'index.html' ? '' : file),
    zh: '/zh/' + (file === 'index.html' ? '' : file)
  };

  var labels = { en: 'EN', th: 'TH', zh: '中文' };
  var ariaLabels = { en: 'English', th: 'ไทย', zh: '中文' };

  var style = document.createElement('style');
  style.textContent =
    '.lang-switch{display:flex;align-items:center;gap:.5rem}' +
    '.lang-switch a{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--stone,#9a9a9a);padding:.2rem .35rem;transition:color .2s}' +
    '.lang-switch a:hover{color:var(--gold,#d4af37)}' +
    '.lang-switch a.active{color:var(--gold,#d4af37);font-weight:600;pointer-events:none}' +
    '.lang-switch .lang-sep{color:var(--stone,#9a9a9a);opacity:.4;font-size:.68rem}' +
    '.mob-menu .lang-switch{margin-top:1rem;gap:.9rem}' +
    '.mob-menu .lang-switch a{font-size:.9rem;font-family:inherit}';
  document.head.appendChild(style);

  function markup() {
    var order = ['en', 'th', 'zh'];
    var html = '';
    order.forEach(function(code, i) {
      if (i > 0) html += '<span class="lang-sep" aria-hidden="true">/</span>';
      var active = code === lang ? ' active' : '';
      html += '<a href="' + hrefFor[code] + '" data-lang="' + code + '" class="lang-flag' + active + '" aria-label="' + ariaLabels[code] + '"' + (code === lang ? ' aria-current="true"' : '') + '>' + labels[code] + '</a>';
    });
    return html;
  }

  function persistOnClick(mount) {
    mount.querySelectorAll('a[data-lang]').forEach(function(a) {
      a.addEventListener('click', function() {
        try { localStorage.setItem(STORE_KEY, a.getAttribute('data-lang')); } catch (e) {}
      });
    });
  }

  document.querySelectorAll('.lang-switch-mount').forEach(function(mount) {
    mount.classList.add('lang-switch');
    mount.innerHTML = markup();
    persistOnClick(mount);
  });

  if (lang === 'en' && file === 'index.html') {
    try {
      var pref = localStorage.getItem(STORE_KEY);
      if (pref && pref !== 'en' && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, '1');
        window.location.replace('/' + pref + '/');
      }
    } catch (e) {}
  }
})();
