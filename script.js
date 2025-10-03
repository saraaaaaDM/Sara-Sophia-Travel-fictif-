/* Small JS: accessible carousel + ARIA + keyboard + autoplay */
    (function(){
      const track = document.getElementById('carouselTrack');
      const slides = Array.from(track.children);
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let current = 0;
      let width = track.getBoundingClientRect().width;
      let autoplay = true;
      let timer;

      function layout() {
        width = track.getBoundingClientRect().width;
        track.style.transform = `translateX(-${current * width}px)`;
        slides.forEach(s => s.style.minWidth = width + 'px');
      }
      window.addEventListener('resize', layout);
      layout();

      function goTo(index){
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * width}px)`;
        resetAutoplay();
      }

      prevBtn.addEventListener('click', ()=> goTo(current - 1));
      nextBtn.addEventListener('click', ()=> goTo(current + 1));

      // keyboard support
      document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft') goTo(current - 1);
        if(e.key === 'ArrowRight') goTo(current + 1);
      });

      // autoplay with pause on hover / focus
      function startAutoplay(){
        stopAutoplay();
        timer = setInterval(()=> goTo(current + 1), 4500);
      }
      function stopAutoplay(){ if(timer) clearInterval(timer); }
      function resetAutoplay(){ if(autoplay) { stopAutoplay(); startAutoplay(); } }

      document.getElementById('heroCarousel').addEventListener('mouseenter', ()=> { autoplay = false; stopAutoplay(); });
      document.getElementById('heroCarousel').addEventListener('mouseleave', ()=> { autoplay = true; startAutoplay(); });
      // also pause when focus inside
      document.getElementById('heroCarousel').addEventListener('focusin', ()=> { autoplay = false; stopAutoplay(); });
      document.getElementById('heroCarousel').addEventListener('focusout', ()=> { autoplay = true; startAutoplay(); });

      // init
      startAutoplay();

      // small progressive enhancement: show slide title in document title when slide changes
      const updateTitle = () => {
        const title = slides[current].dataset.title || '';
        if(title) document.title = `${title} — Sara-Sophia Travel`; 
      };
      const observer = new MutationObserver(updateTitle);
      observer.observe(track, {attributes:true, attributeFilter:['style']});
      updateTitle();

      // footer year
      document.getElementById('year').textContent = new Date().getFullYear();
    })();