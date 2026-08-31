document.addEventListener('DOMContentLoaded', function () {
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML =
    '<button class="close" aria-label="Sluiten">&times;</button>' +
    '<button class="nav prev" aria-label="Vorige foto">&#8249;</button>' +
    '<img src="" alt="">' +
    '<button class="nav next" aria-label="Volgende foto">&#8250;</button>';
  document.body.appendChild(lightbox);
  var lbImg = lightbox.querySelector('img');
  var prevBtn = lightbox.querySelector('.prev');
  var nextBtn = lightbox.querySelector('.next');

  var links = [];
  var currentIndex = -1;

  function showIndex(i) {
    if (!links.length) return;
    currentIndex = (i + links.length) % links.length;
    var link = links[currentIndex];
    var img = link.querySelector('img');
    lbImg.src = link.getAttribute('href');
    lbImg.alt = img ? img.alt : '';
  }

  function openLightbox(gallery, index) {
    links = Array.prototype.slice.call(gallery.querySelectorAll('a'));
    showIndex(index);
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lbImg.src = '';
  }

  document.querySelectorAll('.gallery').forEach(function (gallery) {
    var galleryLinks = gallery.querySelectorAll('a');
    galleryLinks.forEach(function (link, index) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(gallery, index);
      });
    });
  });

  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showIndex(currentIndex - 1);
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showIndex(currentIndex + 1);
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('close')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
    if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
  });
});
