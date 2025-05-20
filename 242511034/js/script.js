// 1. Sayfa yüklendiğinde başlığı büyüt
function buyutBaslik() {
  document.addEventListener("DOMContentLoaded", () => {
    const h1 = document.querySelector("h1");
    if (h1) h1.style.fontSize = "4rem";
  });
}

// 2. Rastgele arka plan rengi değiştir
function rastgeleArkaPlan() {
  const renkler = ["#f4f4f4", "#d0f0c0", "#ffe4e1", "#cce7ff", "#fffacd"];
  document.body.style.backgroundColor = renkler[Math.floor(Math.random() * renkler.length)];
}

// 3. Tüm <span>’leri kırmızı yap
function spanlariKirmiziYap() {
  document.querySelectorAll("span").forEach(el => el.style.color = "red");
}

// 4. Sayfa sonuna gidince alert ver (sadece 1 kez)
function sayfaSonuUyarisi() {
  let gosterildi = false;
  window.addEventListener("scroll", () => {
    if (!gosterildi && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      alert("Sayfanın sonuna geldiniz.");
      gosterildi = true;
    }
  });
}

// 5. Kartları ters sırayla göster
function kartlariTersCevir() {
  const kartContainer = document.querySelector(".row.g-4");
  if (!kartContainer) return;
  const kartlar = Array.from(kartContainer.children).reverse();
  kartlar.forEach(kart => kartContainer.appendChild(kart));
}

// 6. Her tıklamada footer rengini değiştir
let renkIndex = 0;
function footerRenkDegistir() {
  const footer = document.querySelector("footer");
  const renkler = ["#222", "#444", "#666", "#888"];
  if (!footer) return;
  footer.addEventListener("click", () => {
    footer.style.backgroundColor = renkler[renkIndex % renkler.length];
    renkIndex++;
  });
}

// 7. Kartların üstüne gelince büyüt
function kartHoverEtkisi() {
  const kartlar = document.querySelectorAll(".card");
  kartlar.forEach(kart => {
    kart.style.transition = "transform 0.3s";
    kart.addEventListener("mouseenter", () => kart.style.transform = "scale(1.05)");
    kart.addEventListener("mouseleave", () => kart.style.transform = "scale(1)");
  });
}

// 8. Header’ı gizle/göster butonu
function headerGosterGizle() {
  const header = document.querySelector("nav"); // header etiketi yerine navbar seçildi
  if (!header) return;
  const btn = document.createElement("button");
  btn.textContent = "Header Gizle/Göster";
  btn.classList.add("btn", "btn-warning", "m-3");
  btn.onclick = () => header.style.display = (header.style.display === "none" ? "flex" : "none");
  document.body.insertBefore(btn, document.body.firstChild);
}

// 9. Sayfa başlığına tıklayınca yeni başlık ata
function baslikDegistir() {
  const baslik = document.querySelector("h1");
  if (!baslik) return;
  baslik.addEventListener("click", () => {
    baslik.textContent = "TeknoDelal Güncellendi!";
  });
}

// 10. Kullanıcıya günün saatine göre selamlama
function zamanSelamlama() {
  const saat = new Date().getHours();
  let mesaj = "Merhaba!";
  if (saat < 12) mesaj = "Günaydın!";
  else if (saat < 18) mesaj = "İyi günler!";
  else mesaj = "İyi akşamlar!";
  alert(mesaj);
}

// Tüm fonksiyonları aktif et
function baslatTumFonksiyonlar() {
  buyutBaslik();
  rastgeleArkaPlan();
  spanlariKirmiziYap();
  sayfaSonuUyarisi();
  kartlariTersCevir();
  footerRenkDegistir();
  kartHoverEtkisi();
  headerGosterGizle();
  baslikDegistir();
  zamanSelamlama();
}
document.querySelectorAll('.devam-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const icerik = btn.nextElementSibling;
    icerik.classList.toggle('d-none');
    btn.textContent = icerik.classList.contains('d-none') ? "Devamını Oku" : "Kapat";
  });
});


