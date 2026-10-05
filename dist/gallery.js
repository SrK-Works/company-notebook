/* Visual shelves use native scrolling so touch, keyboard and motion preferences work. */
window.productShelf = (() => {
  let dispose = () => {};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(company) {
    const items = window.PRODUCT_VISUALS?.[company.id] || [];
    if (!items.length) return '';
    return `<section class="visual-shelf" aria-labelledby="shelf-title"><div class="shelf-heading"><div><div class="eyebrow">MEET THE OFFERINGS</div><h2 id="shelf-title">Products & services at a glance.</h2><p>A visual introduction to ${escape(company.name)}. Explore a card to see its official reference.</p></div><div class="shelf-controls" aria-label="Product shelf controls"><button type="button" data-shelf-prev aria-label="Previous offerings">←</button><button type="button" class="shelf-play" data-shelf-play aria-label="Pause automatic scrolling">Pause</button><button type="button" data-shelf-next aria-label="Next offerings">→</button></div></div><div class="shelf-track" tabindex="0" role="region" aria-label="${escape(company.name)} product and service images; scroll horizontally"><ul class="shelf-items">${items.map(p => `<li class="offering-card"><a href="${escape(p.url)}" target="_blank" rel="noopener"><div class="offering-image ${p.kind === 'photo' ? 'is-photo' : ''}"><img src="${escape(p.image)}" alt="${escape(p.alt)}" width="480" height="320" loading="lazy" decoding="async"><span class="image-unavailable" hidden>Image unavailable</span></div><div class="offering-copy"><span class="offering-kind">${({photo:'Representative company photo',brand:'Brand image',illustration:'Explanatory illustration',pack:'Product image'})[p.kind] || 'Offering image'}</span><h3>${escape(p.name)}</h3><p>${escape(p.category)}</p><span class="offering-reference">Official reference ↗</span></div></a></li>`).join('')}</ul></div><div class="shelf-footer"><span>${items.length} visual examples · Swipe or use the arrows</span><a href="#products" data-scroll="products">Browse the full list ↓</a></div><p class="source-note">Photos and brand images from official websites; labelled illustrations by Company Notebook. Selected examples, not live inventory; packaging and availability may vary. Images and trademarks belong to their respective owners.</p></section>`;
  }
  function init() {
    dispose();
    const shelf = document.querySelector('.visual-shelf');
    if (!shelf) return;
    const abort = new AbortController(), opts = {signal: abort.signal};
    const track = shelf.querySelector('.shelf-track'), play = shelf.querySelector('[data-shelf-play]');
    const prev = shelf.querySelector('[data-shelf-prev]'), next = shelf.querySelector('[data-shelf-next]');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = motion.matches, hovered = false, focused = false, visible = false;
    let overflows = false;
    function sync() {
      overflows = track.scrollWidth > track.clientWidth + 2;
      prev.disabled = next.disabled = play.disabled = !overflows;
      play.textContent = paused ? 'Play' : 'Pause';
      play.setAttribute('aria-label', `${paused ? 'Start' : 'Pause'} automatic scrolling`);
      play.setAttribute('aria-pressed', String(!paused));
    }
    function move(direction) {
      const width = shelf.querySelector('.offering-card').getBoundingClientRect().width + 16;
      const max = track.scrollWidth - track.clientWidth;
      let target = track.scrollLeft + direction * width;
      if (target > max + 2) target = 0;
      if (target < -2) target = max;
      track.scrollTo({left: Math.min(max, Math.max(0, target)), behavior: motion.matches ? 'instant' : 'smooth'});
    }
    function stop() { paused = true; sync(); }
    play.addEventListener('click', () => {paused = !paused; sync();}, opts);
    prev.addEventListener('click', () => {stop();move(-1);}, opts);
    next.addEventListener('click', () => {stop();move(1);}, opts);
    track.addEventListener('pointerdown', stop, opts);
    track.addEventListener('wheel', stop, {...opts, passive: true});
    track.addEventListener('keydown', e => {
      stop();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault();move(e.key === 'ArrowRight' ? 1 : -1);}
    }, opts);
    shelf.addEventListener('mouseenter', () => {hovered = true;}, opts);
    shelf.addEventListener('mouseleave', () => {hovered = false;}, opts);
    shelf.addEventListener('focusin', e => {focused = track.contains(e.target);}, opts);
    shelf.addEventListener('focusout', e => {focused = track.contains(e.relatedTarget);}, opts);
    shelf.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
      img.hidden = true; img.nextElementSibling.hidden = false;
    }, opts));
    const observer = new IntersectionObserver(entries => {visible = entries[0].isIntersecting;}, {threshold: .2});
    observer.observe(shelf);
    const sizeObserver = new ResizeObserver(sync);sizeObserver.observe(track);
    const onMotion = () => {if (motion.matches) stop();};
    motion.addEventListener('change', onMotion, opts);
    shelf.querySelector('[data-scroll]').addEventListener('click', () => {const list = document.querySelector('.portfolio-list');if (list) list.open = true;}, opts);
    const timer = setInterval(() => {if (overflows && visible && !paused && !hovered && !focused && !document.hidden) move(1);}, 5500);
    sync();
    dispose = () => {clearInterval(timer);observer.disconnect();sizeObserver.disconnect();abort.abort();};
  }
  return {render, init, cleanup: () => dispose()};
})();
