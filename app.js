// Галереи домов и территории + лайтбокс
(() => {
  const lb = document.getElementById('lb');
  const lbImg = lb.querySelector('img');
  let set = [], idx = 0;

  const show = i => {
    idx = (i + set.length) % set.length;
    lbImg.src = `img/${set[idx]}.jpg`;
  };

  document.querySelectorAll('[data-gallery]').forEach(box => {
    const list = window.PHOTOS[box.dataset.gallery] || [];
    const visible = box.classList.contains('mosaic') ? list.length : 5;
    list.slice(0, visible).forEach((name, i) => {
      const b = document.createElement('button');
      b.className = 'g-item';
      b.type = 'button';
      b.setAttribute('aria-label', 'Открыть фото');
      const big = i === 0 || (box.classList.contains('mosaic') && i === 5);
      b.innerHTML = `<img src="img/${name}${big ? '' : '_s'}.jpg" alt="" loading="lazy">`;
      if (i === visible - 1 && list.length > visible) {
        b.classList.add('g-more');
        b.dataset.more = `+${list.length - visible} фото`;
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
