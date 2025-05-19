// 1. Ad alanının boş olup olmadığını kontrol eder
function kontrolAd() {
  const ad = document.getElementById("ad").value;
  if (ad.trim() === "") {
    alert("Ad alanı boş bırakılamaz.");
    return false;
  }
  return true;
}

// 2. Soyad kontrolü
function kontrolSoyad() {
  const soyad = document.getElementById("soyad").value;
  if (soyad.trim() === "") {
    alert("Soyad alanı boş bırakılamaz.");
    return false;
  }
  return true;
}

// 3. Email doğruluğu
function kontrolEmail() {
  const email = document.getElementById("email").value;
  const desen = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!desen.test(email)) {
    alert("Geçerli bir e-posta adresi giriniz.");
    return false;
  }
  return true;
}

// 4. Telefon numarası kontrolü
function kontrolTelefon() {
  const tel = document.getElementById("tel").value;
  if (tel.trim().length < 10) {
    alert("Telefon numarası eksik veya geçersiz.");
    return false;
  }
  return true;
}

// 5. Cinsiyet seçimi kontrolü
function kontrolCinsiyet() {
  const erkek = document.getElementById("erkek")?.checked;
  const kadin = document.getElementById("kadin")?.checked;
  if (!erkek && !kadin) {
    alert("Lütfen cinsiyet seçiniz.");
    return false;
  }
  return true;
}

// 6. Şehir seçimi kontrolü
function kontrolSehir() {
  const sehir = document.getElementById("sehir")?.value;
  if (!sehir || sehir === "") {
    alert("Lütfen şehir seçiniz.");
    return false;
  }
  return true;
}

// 7. Doğum tarihi kontrolü
function kontrolDogumTarihi() {
  const tarih = document.getElementById("dogumtarihi")?.value;
  if (!tarih) {
    alert("Doğum tarihi giriniz.");
    return false;
  }
  return true;
}

// 8. Mesaj alanı kontrolü
function kontrolMesaj() {
  const mesaj = document.getElementById("mesaj")?.value;
  if (!mesaj || mesaj.trim().length < 10) {
    alert("Mesaj en az 10 karakter olmalıdır.");
    return false;
  }
  return true;
}

// 9. Checkbox (onay kutusu) kontrolü
function kontrolOnay() {
  const onay = document.getElementById("onay")?.checked;
  if (!onay) {
    alert("Devam etmek için onay kutusunu işaretleyin.");
    return false;
  }
  return true;
}

// 10. Genel form doğrulama fonksiyonu
function formuGonder(event) {
  event.preventDefault(); // sayfa yenilenmesini engeller

  if (
    kontrolAd() &&
    kontrolSoyad() &&
    kontrolEmail() &&
    kontrolTelefon() &&
    kontrolCinsiyet() &&
    kontrolSehir() &&
    kontrolDogumTarihi() &&
    kontrolMesaj() &&
    kontrolOnay()
  ) {
    alert("Form başarıyla gönderildi!");
    document.getElementById("iletisimformu").reset();
  }
}

// Sayfa yüklendiğinde yapılacaklar
window.onload = () => {
  hosgeldinMesaji();
  footerTarihiYazdir();

  window.addEventListener("scroll", sayfaSonunaGeldiMi);
  window.addEventListener("scroll", scrollButonGoster);

  const resimler = document.querySelectorAll(".yer img");
  resimler.forEach((img) => {
    img.addEventListener("mouseenter", resimBuyut);
    img.addEventListener("mouseleave", resimKucult);
  });
};

// Fonksiyonlar
function hosgeldinMesaji() {
  alert("Türkiye'deki Tarihi Yerler Gezi Bloguna Hoş Geldiniz!");
}

function yerDetayGoster(yerAdi) {
  alert(yerAdi + " hakkında daha fazla bilgi edinmek için teşekkürler!");
}

function yerleriListele() {
  const yerler = [
    "Ayasofya",
    "Efes Antik Kenti",
    "Kapadokya",
    "Topkapı Sarayı",
    "Nemrut Dağı",
  ];
  console.log("Tarihi Yerler:", yerler.join(", "));
}

function asagiKaydir(miktar) {
  window.scrollBy({ top: miktar, behavior: "smooth" });
}

function temaDegistir() {
  document.body.classList.toggle("geceModu");
}

function sayfaSonunaGeldiMi() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    alert("Sayfanın sonuna geldiniz.");
  }
}

function filtrele(etiket) {
  alert(etiket + " etiketine göre filtreleme yapılacak (henüz uygulanmadı).");
}

function footerTarihiYazdir() {
  const yil = new Date().getFullYear();
  const footer = document.querySelector("footer div");
  if (footer)
    footer.innerHTML = `Telif © ${yil} | Türkiye Tarihi Gezi Blogu | Tüm hakları saklıdır.`;
}

function resimBuyut(event) {
  const img = event.target;
  img.style.transform = "scale(1.1)";
  img.style.transition = "transform 0.3s ease";
}

function resimKucult(event) {
  const img = event.target;
  img.style.transform = "scale(1)";
}

function scrollButonGoster() {
  const btn = document.getElementById("btnScrollTop");
  if (!btn) return;

  if (window.scrollY > 200) btn.style.display = "block";
  else btn.style.display = "none";
}

function scrollUsteDon() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
