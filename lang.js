/* Freedom Extension — language switcher.
 *
 * One list for every page. To add a language:
 *   1. put index.<code>.html next to index.html;
 *   2. add one line to LANGS below.
 * The dropdown is built from here, so no page has to keep its own list of languages.
 */
var LANGS = [
  { code: 'en', label: 'English', file: 'index.html',    aria: 'Language' },
  { code: 'ru', label: 'Русский', file: 'index.ru.html', aria: 'Язык' }
];

(function () {
  var box = document.getElementById('langbar');
  if (!box) return;

  var here = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var pageLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
  var current = null;
  var i;

  /* The page itself is the authority on which language it is; the file name is the fallback. */
  for (i = 0; i < LANGS.length; i++) {
    if (LANGS[i].code === pageLang) { current = LANGS[i]; break; }
  }
  for (i = 0; i < LANGS.length && !current; i++) {
    if (LANGS[i].file.toLowerCase() === here) { current = LANGS[i]; break; }
  }
  if (!current) current = LANGS[0];

  var sel = document.createElement('select');
  sel.id = 'lang-select';
  sel.setAttribute('aria-label', current.aria || current.label);

  for (i = 0; i < LANGS.length; i++) {
    var opt = document.createElement('option');
    opt.value = LANGS[i].file;
    opt.textContent = LANGS[i].label;
    if (LANGS[i].code === current.code) opt.selected = true;
    sel.appendChild(opt);
  }

  sel.addEventListener('change', function () {
    if (sel.value && sel.value !== current.file) window.location.href = sel.value;
  });

  /* clear the placeholder (this also drops the <noscript> fallback link) without innerHTML */
  while (box.firstChild) box.removeChild(box.firstChild);
  box.appendChild(sel);
})();
