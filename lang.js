// Přepínač jazyka pro rozcestník i generované právní stránky.
// Statický soubor — tool/gen_legal_site.dart se ho nedotýká, jen na něj odkazuje.
//
// Stránky mají obě jazykové verze v HTML viditelné; tenhle skript tu nevybranou
// schová a odkryje tlačítka. Když se skript nenačte, zůstanou obě verze pod
// sebou — nikdy nevznikne prázdná stránka.
//
// Pořadí voleb: kotva v URL (#cs, #en) → dřívější volba → jazyk prohlížeče
// (čeština jen pro cs*) → angličtina.
(function () {
  var sw = document.querySelector('[data-langswitch]');
  var docs = document.querySelectorAll('[data-lang-doc]');
  var sep = document.querySelector('[data-lang-sep]');
  if (!sw || docs.length < 2) return;
  var btns = sw.querySelectorAll('button[data-lang]');

  function apply(lang) {
    for (var i = 0; i < docs.length; i++) {
      docs[i].hidden = docs[i].getAttribute('data-lang-doc') !== lang;
    }
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute(
        'aria-pressed',
        btns[j].getAttribute('data-lang') === lang ? 'true' : 'false'
      );
    }
    document.documentElement.lang = lang;
    try { localStorage.setItem('numici-legal-lang', lang); } catch (e) {}
  }

  function initial() {
    var hash = (location.hash || '').replace('#', '');
    if (hash === 'cs' || hash === 'en') return hash;
    try {
      var saved = localStorage.getItem('numici-legal-lang');
      if (saved === 'cs' || saved === 'en') return saved;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('cs') === 0
      ? 'cs'
      : 'en';
  }

  for (var k = 0; k < btns.length; k++) {
    btns[k].addEventListener('click', function () {
      apply(this.getAttribute('data-lang'));
    });
  }
  sw.hidden = false;
  if (sep) sep.hidden = true;
  apply(initial());
})();
