document.addEventListener('DOMContentLoaded', function () {
  // 1. Ziyaretçi Sayacı
  const counter = document.querySelector('#visitorCounter .fw-bold');
  if (counter) {
    const todayVisits = Math.floor(Math.random() * 3000) + 1000;
    counter.textContent = todayVisits.toLocaleString('tr-TR');
  }

  // 2. Devamını Oku Butonları
  document.querySelectorAll('.read-more').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const content = btn.parentElement.querySelector('.hidden-content');
      if (content.style.display === 'block') {
        content.style.display = 'none';
        btn.innerHTML = 'Devamını Oku <i class="fas fa-arrow-right"></i>';
      } else {
        content.style.display = 'block';
        btn.innerHTML = 'Gizle <i class="fas fa-arrow-up"></i>';
      }
    });
  });

  // 3. Yukarı Çık Butonu
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.opacity = window.scrollY > 200 ? 1 : 0;
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Daha Fazla Yükle Butonu
  $('#loadMoreBtn').click(function() {
    alert('Daha fazla içerik yükleniyor...');
    // Gerçek uygulamada burada AJAX çağrısı yapılır
  });

  // 5. Yorum Beğenme
  $('.like-btn').click(function() {
    const likeCount = $(this).find('.like-count');
    let count = parseInt(likeCount.text());
    likeCount.text(count + 1);
    $(this).prop('disabled', true);
  });

  // 6. Haber Kartı Efekti
  $('.news-card').hover(
    function() {
      $(this).css('transform', 'translateY(-10px)');
    },
    function() {
      $(this).css('transform', 'translateY(0)');
    }
  );

  // 7. Kategori Filtreleme
  $('.category-filter').click(function() {
    const category = $(this).data('category');
    $('.news-card').hide();
    $(`.${category}`).show();
  });

  // 8. Arama Fonksiyonu
  $('#searchInput').keyup(function() {
    const searchText = $(this).val().toLowerCase();
    $('.news-card').each(function() {
      const cardText = $(this).text().toLowerCase();
      $(this).toggle(cardText.includes(searchText));
    });
  });

  // 9. Saat Gösterimi
  function updateClock() {
    const now = new Date();
    $('#clock').text(now.toLocaleTimeString('tr-TR'));
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 10. Form Doğrulama
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    if (!email.includes('@')) {
      alert('Geçerli bir e-posta adresi girin!');
      return false;
    }
    alert('Form başarıyla gönderildi!');
    return true;
  });

  // 11. Modal Açma (jQuery)
  $('#showModal').click(function() {
    $('#exampleModal').modal('show');
  });

  // 12. Tooltip Etkinleştirme (jQuery)
  $('[data-bs-toggle="tooltip"]').tooltip();

  // 13. Carousel Otomatik Döndürme (jQuery)
  $('#newsCarousel').carousel({
    interval: 3000
  });

  // 14. Dropdown Menü (jQuery)
  $('.dropdown-toggle').dropdown();

  // 15. Toast Mesajı Gösterme (jQuery)
  $('.toast-btn').click(function() {
    $('.toast').toast('show');
  });
});