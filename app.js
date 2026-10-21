// Ссылка на профиль в мессенджере MAX (вида https://max.ru/u/...).
// Пока пусто — кнопки ведут на телефон и подписаны текстом из data-fallback.
const MAX_LINK = '';

(() => {
  const setMax = root => root.querySelectorAll('[data-max]').forEach(a => {
    if (MAX_LINK) {
      a.href = MAX_LINK;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.textContent = a.dataset.fallback;
    }
  });
  setMax(document);
  document.querySelectorAll('template').forEach(t => setMax(t.content));

  // Галереи домов и участка + просмотр фото
  const lb = document.getElementById('lb');
  const lbImg = lb.querySelector('img');
  let set = [], idx = 0;

  const show = i => {
    idx = (i + set.length) % set.length;
    lbImg.src = `img/${set[idx]}.jpg`;
  };

  document.querySelectorAll('[data-gallery]').forEach(box => {
    const list = window.PHOTOS[box.dataset.gallery] || [];
    const mosaic = box.classList.contains('mosaic');
    const visible = mosaic ? list.length : 4;
    list.slice(0, visible).forEach((name, i) => {
      const b = document.createElement('button');
      b.className = 'g-item';
      b.type = 'button';
      b.setAttribute('aria-label', 'Открыть фото');
      const big = mosaic ? [0, 5].includes(i) : i === 0;
      b.innerHTML = `<img src="img/${name}${big ? '' : '_s'}.jpg" alt="" loading="lazy">`;
      if (i === visible - 1 && list.length > visible) {
        b.classList.add('g-more');
        b.dataset.more = `ещё ${list.length - visible} фото`;
      }
      b.addEventListener('click', () => { set = list; show(i); lb.showModal(); });
      box.appendChild(b);
    });
  });

  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.querySelector('[data-close]').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  document.addEventListener('keydown', e => {
    if (!lb.open) return;
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  document.getElementById('y').textContent = new Date().getFullYear();
})();
