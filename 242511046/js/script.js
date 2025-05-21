// Favorilere ekle butonuna tıklanınca çalışır
function favorilereEkle(button) {
  const cardBody = button.parentElement;
  const pastaAdi = cardBody.querySelector('.card-title').innerText.split('\n')[0]; // ürün adı

  // Buton durumu değişir
  const favoriDurumuSpan = cardBody.querySelector('.favoriDurumu');

  // Eğer zaten favorideyse çıkar, değilse ekle
  if (button.classList.contains('btn-danger')) {
    button.classList.remove('btn-danger');
    button.classList.add('btn-outline-danger');
    button.innerText = "Favorilere Ekle";
    favoriDurumuSpan.innerText = "⭐ Favorilerden çıkarıldı";
  } else {
    button.classList.remove('btn-outline-danger');
    button.classList.add('btn-danger');
    button.innerText = "Favorilerden Çıkar";
    favoriDurumuSpan.innerText = "⭐ Favorilere eklendi";
  }
}

// Sayfa yüklendiğinde hoşgeldiniz mesajı
function welcomeMessage() {
  alert("Tatlı Pastanem’e hoş geldiniz! En sevdiğiniz tatlıyı keşfedin.");
}

// Sayfa yüklendiğinde animasyonlu başlık renk değiştirme
function animateTitle() {
  const title = document.getElementById("tatliPastanem");
  let colors = ["#e91e63", "#ff9800", "#4caf50", "#2196f3"];
  let index = 0;
  setInterval(() => {
    title.style.color = colors[index];
    index = (index + 1) % colors.length;
  }, 1500);
}

// Sayfa yüklendiğinde tatlı ürünlerinin altındaki fiyatlara dikkat çekme animasyonu
function animatePrices() {
  const prices = document.querySelectorAll(".badge.bg-success");
  prices.forEach(price => {
    price.style.transition = "transform 0.5s";
  });
  let scaleUp = true;
  setInterval(() => {
    prices.forEach(price => {
      price.style.transform = scaleUp ? "scale(1.2)" : "scale(1)";
    });
    scaleUp = !scaleUp;
  }, 1000);
}

// YouTube video iframe responsive yapmak için 
function makeVideoResponsive() {
  const iframe = document.querySelector("iframe");
  if (!iframe) return;
  iframe.style.width = "100%";
  iframe.style.height = "315px";
}

// Sayfa yüklendiğinde yukarı çık butonu ve scroll olayı
function scrollFunction() {
  const btn = document.getElementById("upButton");
  if (!btn) return;
  btn.style.display = window.scrollY > 200 ? "block" : "none";
}

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 1. Form inputlarını temizleyen fonksiyon
function formuTemizle() {
  const form = document.getElementById('iletisimForm');
  form.reset();
}

// 2. Email formatını basitçe kontrol eden fonksiyon
function emailGecerliMi(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 3. Form gönderilirken email kontrolü yapıp uyarı veren fonksiyon
function formKontrolVeGonder() {
  const emailInput = document.querySelector('#iletisimForm input[type="email"]');
  if (!emailGecerliMi(emailInput.value)) {
    alert('Lütfen geçerli bir e-posta adresi giriniz.');
    emailInput.focus();
    return false;
  }
  alert('Mesajınız başarıyla gönderildi. Teşekkürler!');
  formuTemizle();
  return false; // Sayfanın yenilenmesini önlemek için
}

// 4. Sayfa altına indikçe "Bize Ulaşın" butonunu göster/gizle
function scrollButtonToggle() {
  const btn = document.getElementById('contactButton');
  if (!btn) return;
  btn.style.display = window.scrollY > 400 ? 'block' : 'none';
}

// 5. "Bize Ulaşın" butonuna tıklanınca iletişim formuna yumuşak scroll
function scrollToContactForm() {
  const form = document.getElementById('iletisimForm');
  if (!form) return;
  form.scrollIntoView({ behavior: 'smooth' });
}

// Event Listener ekleme örneği
document.addEventListener('DOMContentLoaded', () => {
  welcomeMessage();
  animateTitle();
  animatePrices();
  makeVideoResponsive();

  // Yukarı çık butonu varsa scroll event ekle
  if (document.getElementById("upButton")) {
    window.addEventListener('scroll', scrollFunction);
    document.getElementById("upButton").addEventListener('click', goTop);
  }

  // Scroll'a bağlı "Bize Ulaşın" butonu göster/gizle
  window.addEventListener('scroll', scrollButtonToggle);

  // "Bize Ulaşın" butonu click event 
  const contactBtn = document.getElementById('contactButton');
  if (contactBtn) {
    contactBtn.addEventListener('click', scrollToContactForm);
  }

  const form = document.getElementById('iletisimForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Sayfa yenilenmesini engelle
    formKontrolVeGonder();
  });
}


  // Diğer eventler...
  const videoButton = document.getElementById("goToVideo");
  const videoSection = document.getElementById("videoTanitim");
  if (videoButton && videoSection) {
    videoButton.addEventListener("click", () => {
      videoSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // DARK MODE BUTONU
  const darkModeButton = document.getElementById("darkModeToggle");
  if (darkModeButton) {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      darkModeButton.innerText = "☀️";
    } else {
      darkModeButton.innerText = "🌙";
    }

    darkModeButton.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isDark);
      darkModeButton.innerText = isDark ? "☀️" : "🌙";
    });
  }
});

function autoDarkModeByTime() {
  const hour = new Date().getHours();
  if (hour >= 19 || hour <= 6) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
window.addEventListener('load', autoDarkModeByTime);

function showSubscribePopup() {
  const popup = document.getElementById('subscribePopup');
  if (!popup) return;
  if (window.scrollY > 600) {
    popup.style.display = 'block';
  } else {
    popup.style.display = 'none';
  }
}
window.addEventListener('scroll', showSubscribePopup);
