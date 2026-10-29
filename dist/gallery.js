/* Visual shelves use native scrolling so touch, keyboard and motion preferences work. */
window.productShelf = (() => {
  let dispose = () => {};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(company) {
    const items = window.PRODUCT_VISUALS?.[company.id] || [];
    if (!items.length) return '';
    return `<section class="visual-shelf" id="offerings" aria-labelledby="shelf-title"><div class="shelf-heading"><div><div class="eyebrow">MEET THE OFFERINGS</div><h2 id="shelf-title">Products & services at a glance.</h2><p>A visual introduction to ${escape(company.name)}. Explore a card to see its official reference.</p></div></div><div class="shelf-track" tabindex="0" role="region" aria-label="${escape(company.name)} product and service images; scroll horizontally"><ul class="shelf-items">${items.map(p => `<li class="offering-card"><a href="${escape(p.url)}" target="_blank" rel="noopener"><div class="offering-image ${p.kind === 'photo' ? 'is-photo' : p.kind === 'service' ? 'is-service' : ''}"><img src="${escape(p.image)}" alt="${escape(p.alt)}" width="480" height="320" loading="lazy" decoding="async"><span class="image-unavailable" hidden>Image unavailable</span></div><div class="offering-copy"><span class="offering-kind">${({photo:'Representative company photo',brand:'Brand image',service:'Official service illustration',illustration:'Explanatory illustration',pack:'Product image'})[p.kind] || 'Offering image'}</span><h3>${escape(p.name)}</h3><p>${escape(p.category)}</p><span class="offering-reference">Official reference ↗</span></div></a></li>`).join('')}</ul></div><div class="shelf-footer"><span>${items.length} visual examples · Swipe or scroll to explore</span><a href="#products" data-scroll="products">Browse the full list ↓</a></div><p class="source-note">Company images and service artwork from official websites; original explanatory illustrations are labelled. Selected examples, not live inventory; packaging and availability may vary. Images and trademarks belong to their respective owners.</p></section>`;
  }
  function init() {
    dispose();
    const shelf = document.querySelector('.visual-shelf');
    if (!shelf) return;
    const abort = new AbortController(), opts = {signal: abort.signal};
    const track = shelf.querySelector('.shelf-track');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const list = track.querySelector('.shelf-items');
    const originals = Array.from(list.children);
    let paused = false, hovered = false, focused = false, visible = false;
    let overflows = false, cycleWidth = 0, frame = 0, lastTime = 0, position = 0;
    const pixelsPerSecond = 22;

    function canAnimate() {
      return overflows && visible && !paused && !hovered && !focused && !motion.matches && !document.hidden;
    }
    function tick(now) {
      frame = 0;
      if (!canAnimate()) return;
      if (lastTime) position = (position + pixelsPerSecond * Math.min(now - lastTime, 64) / 1000) % cycleWidth;
      lastTime = now;
      track.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    }
    function refresh() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      position = track.scrollLeft;
      if (canAnimate()) frame = requestAnimationFrame(tick);
    }
    function sync() {
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const first = originals[0].getBoundingClientRect();
      const last = originals[originals.length - 1].getBoundingClientRect();
      cycleWidth = last.right - first.left + gap;
      overflows = cycleWidth - gap > track.clientWidth + 2;
      const clones = list.querySelectorAll('[data-shelf-clone]');
      if (overflows && !clones.length) {
        // A second visual copy makes the last-to-first transition seamless.
        // Hide repeat content from assistive technology and the keyboard tab order.
        const fragment = document.createDocumentFragment();
        originals.forEach(card => {
          const copy = card.cloneNode(true);
          copy.dataset.shelfClone = '';
          copy.setAttribute('aria-hidden', 'true');
          copy.querySelectorAll('a').forEach(link => link.setAttribute('tabindex', '-1'));
          fragment.append(copy);
        });
        list.append(fragment);
      } else if (!overflows) {
        clones.forEach(copy => copy.remove());
        track.scrollLeft = 0;
      }
      refresh();
    }
    function stop() { paused = true; refresh(); }
    function move(direction) {
      const width = originals[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(list).columnGap) || 0);
      track.scrollBy({left: direction * width, behavior: motion.matches ? 'instant' : 'smooth'});
    }
    track.addEventListener('pointerdown', stop, opts);
    track.addEventListener('wheel', stop, {...opts, passive: true});
    track.addEventListener('keydown', e => {
      stop();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {e.preventDefault();move(e.key === 'ArrowRight' ? 1 : -1);}
    }, opts);
    shelf.addEventListener('mouseenter', () => {hovered = true; refresh();}, opts);
    shelf.addEventListener('mouseleave', () => {hovered = false; refresh();}, opts);
    shelf.addEventListener('focusin', e => {focused = track.contains(e.target); refresh();}, opts);
    shelf.addEventListener('focusout', e => {focused = track.contains(e.relatedTarget); refresh();}, opts);
    shelf.addEventListener('error', e => {
      if (e.target.matches('.offering-image img')) {
        e.target.hidden = true;
        e.target.nextElementSibling.hidden = false;
      }
    }, {...opts, capture: true});
    const observer = new IntersectionObserver(entries => {visible = entries[0].isIntersecting; refresh();}, {threshold: .2});
    observer.observe(shelf);
    const sizeObserver = new ResizeObserver(sync);
    sizeObserver.observe(track);
    motion.addEventListener('change', refresh, opts);
    document.addEventListener('visibilitychange', refresh, opts);
    shelf.querySelector('[data-scroll]').addEventListener('click', () => {const list = document.querySelector('.portfolio-list');if (list) list.open = true;}, opts);
    sync();
    dispose = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      abort.abort();
      list.querySelectorAll('[data-shelf-clone]').forEach(copy => copy.remove());
      dispose = () => {};
    };
  }
  return {render, init, cleanup: () => dispose()};
})();
