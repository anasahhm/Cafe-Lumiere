import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000, offset: 100 });

document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById('customerCount');
  if (!counter) return;

  const target = 70;
  const duration = 1800;
  let started = false;

  function animate() {
    if (started) return;
    started = true;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);

      counter.innerHTML = `${current}<span>k+</span>`;

      if (progress < 1) requestAnimationFrame(step);
      else counter.innerHTML = `${target}<span>k+</span>`;
    }

    requestAnimationFrame(step);
  }

  // Observe the parent testimonial section
  const testimonial = document.querySelector('.hero-content__testimonial');
  if (!testimonial) {
    // fallback: just animate immediately
    animate();
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
        io.disconnect();
      }
    });
  }, { threshold: 0.5 });

  io.observe(testimonial);
});

const nextButton= document.querySelector('.next-btn');
const video= document.querySelector('.hero-vid video');

const vidList=['assets/video-1.mp4',
               'assets/video-2.mp4',
               'assets/video-3.mp4',
               'assets/video-4.mp4'];

let index=0;
nextButton.addEventListener('click',function(){
    index++;
    if (index >= vidList.length) index = 0;
    video.src = vidList[index];
    video.play();
})
