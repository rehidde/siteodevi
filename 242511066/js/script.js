// script.js - Güncellenmiş Unique Türkçe Fonksiyonlar ve RobotÖmer

// Bilgilendirme mesajı gösterir (eskiden yazdirMesaj)
function bilgiMesajiGoster(mesaj) {
  alert(mesaj);
}

// Belirli bir elementin rengini değiştirir (eskiden renkDegistir)
function elementRenginiDegistir(id, renk) {
  document.getElementById(id).style.color = renk;
}

// İki sayıyı toplar (eskiden toplam)
function sayilariTopla(sayi1, sayi2) {
  return sayi1 + sayi2;
}

// Anlık tarihi gösterir (eskiden tarihGoster) - index sayfasında kullanılıyor
function anlikTarihiGoster() {
  alert("Şu anki tarih ve saat: " + new Date().toLocaleString('tr-TR'));
}

// Formdaki input alanlarını temizler (eskiden kutucukTemizle)
function formAlanlariniTemizle() {
  $("input[type='text'], input[type='email'], input[type='tel'], input[type='url'], input[type='number'], input[type='password'], textarea, input[type='date'], input[type='time'], input[type='color']").val("");
  // Range input'unu sıfırlamak için default değerine veya ortasına ayarlayabilirsiniz, şimdilik es geçildi.
  $('#memnuniyet').val(5); // Range input'u varsayılan değere set et
}

// Belirli bir listenin görünürlüğünü değiştirir (açip/kapar) (eskiden toggleListe)
function listeGorselliginiDegistir(id) {
  $("#" + id).slideToggle();
}

// Sayfanın başına yumuşakça kaydırır (eskiden scrollYukari)
function sayfaBasinaKaydir() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

// Yeni Fonksiyon: İletişim başlığını değiştirir (eskiden hosgeldinYazisiniGuncelle ama iletisim için özelleştirildi)
function iletisimBasliginiDegistir() {
    const baslikElementi = $('#iletisimBaslik'); // iletisim.html'deki başlığın id'si
    const mevcutMetin = baslikElementi.text();
    if (mevcutMetin === 'İletişim Formu') {
        baslikElementi.text('Mesajınızı Bırakın!');
    } else {
        baslikElementi.text('İletişim Formu');
    }
}


// Müzik divleri üzerine gelince arka plan rengini değiştirir (eskiden hoverEfekti) - İletişim sayfasında onload ile çağrılıyor, index'te de kullanılabilir
function listeElementiHoverEfekti() {
  $(".muzik-div").hover(
    function() { $(this).css("background-color", "#e2e6ea"); }, // style.css'deki hover rengiyle aynı
    function() { $(this).css("background-color", ""); } // CSS'e dön
  );
}

// Belirtilen URL'ye yönlendirir (eskiden sayfaYonlendir) - İletişim sayfasında kullanılıyor
function belirliSayfayaYonlendir(url) {
  window.location.href = url;
}

// İletişim formu inputlarını kontrol eder (eskiden inputKontrol) - İletişim sayfasında kullanılıyor
function iletisimGirisleriniKontrolEt() {
  let bosAlanVar = false;
  // Sadece gerekli (required) alanları kontrol edelim
  $("input[required], textarea[required]").each(function() {
    if ($(this).val().trim() === "") {
      bosAlanVar = true;
      return false; // Döngüyü kır
    }
  });

  if (bosAlanVar) {
    bilgiMesajiGoster("Lütfen gerekli (*) alanları doldurunuz."); // Mesaj güncellendi
  } else {
    bilgiMesajıGoster("Form başarıyla gönderildi (Bu sadece bir simülasyondur). Keyifli!"); // Mesaj güncellendi ve "Keyifli" eklendi
    formAlanlariniTemizle(); // Formu gönderdikten sonra temizle
  }
}

// 7 ile 70 arasında rastgele sayı üretir ve ekranda gösterir
function yetmistenYediyeSayiUret() {
  const min = 7;
  const max = 70;
  const rastgeleSayi = Math.floor(Math.random() * (max - min + 1)) + min;
  $('#rastgeleSayiDeger').text(rastgeleSayi); // HTML'deki ilgili span'e yazdır
}

// Başlik rengini değiştirir ve eski haline döner (elementRenginiDegistir kullanıldı) - index sayfasında kullanılıyor
let baslikNormalRenkte = true;
function baslikRenginiDegistirToggle() {
    const baslikElementi = document.getElementById('anaBaslik'); // index.html'de h1'e id="anaBaslik" ekleyeceğiz
    if (baslikNormalRenkte) {
        elementRenginiDegistir('anaBaslik', '#28a745'); // Yeşil renk
        baslikNormalRenkte = false;
    } else {
        elementRenginiDegistir('anaBaslik', '#0056b3'); // style.css'deki varsayılan başlık rengi
        baslikNormalRenkte = true;
    }
}

// Sayıları toplar ve sonucu gösterir (sayilariTopla kullanıldı) - index sayfasında kullanılıyor
function toplamaSonucunuGoster() {
    const sayi1 = parseFloat($('#sayiBirInput').val()) || 0; // Input değerini al, sayıya çevir, geçersizse 0 yap
    const sayi2 = parseFloat($('#sayiIkiInput').val()) || 0;
    const sonuc = sayilariTopla(sayi1, sayi2);
    $('#toplamSonucu').text("Sonuç: " + sonuc); // HTML'deki ilgili span'e yazdır
}

// Yeni Fonksiyon: robotömer rastgele kelime seçer ve gösterir
function robotOmerKonus() {
    const kelimeler = ["keyifli", "sıkıntı", "sigara", "kahve"];
    const rastgeleIndex = Math.floor(Math.random() * kelimeler.length);
    const secilenKelime = kelimeler[rastgeleIndex];
    $('#robotOmerCikti').text(secilenKelime); // HTML'deki ilgili span'e yazdır
}

// "bne" fotoğrafını değiştiren fonksiyon ve son mesajı gösterir
let currentBneImageIndex = 0;
// 4 fotoğraf olduğu varsayımıyla diziyi güncelliyoruz
const bneImages = ["img/bne1.jpg", "img/bne2.jpg", "img/bne3.jpg", "img/bne4.jpg"];
const finalMessage = "Kimisi bakar geçer, kimisi kaybolur... ama bazı yüzler sadece müzede güler.";

function bneFotografiDegistir() {
    const bneFoto = $('#bneFoto');
    const bneYazisi = $('#bneYazisi');
    const bneSonMesaj = $('#bneSonMesaj');

    if (currentBneImageIndex < bneImages.length) {
        bneFoto.attr('src', bneImages[currentBneImageIndex]);
        currentBneImageIndex++;
    } else {
        // Tüm fotoğraflar bittiğinde
        bneFoto.hide(); // Fotoğrafı gizle
        bneYazisi.hide(); // Yazı butonunu gizle
        bneSonMesaj.html(finalMessage).show(); // Mesajı göster
    }
}

// Sayfa yüklendiğinde çalışacak fonksiyonlar
$(document).ready(function() {
    // Sadece iletisim sayfasında çalışacak hover efekti
     if ($('body').hasClass('iletisim-sayfasi')) { // iletisim.html body etiketine class="iletisim-sayfasi" ekleyeceğiz
        listeElementiHoverEfekti(); // İletişim sayfasındaki .muzik-div benzeri elementler için (örnekteki müzik-div)
     }

     // index sayfasında çalışacak başlangıç işlemleri
     if ($('body').hasClass('index-sayfasi')) { // index.html body etiketine class="index-sayfasi" ekleyeceğiz
        yetmistenYediyeSayiUret(); // Sayfa yüklendiğinde rastgele sayıyı göster
        // İlk fotoğrafı göstermek için başlangıçta bir kez çağırabilirsiniz
        // Ya da doğrudan ilk fotoğrafı HTML'de ayarlayabilirsiniz: <img src="img/bne1.jpg" ...
        // Eğer HTML'de varsayılan bir başlangıç fotoğrafı varsa, bu kısmı kaldırabilirsiniz.
        // Örneğin şu anki durumda HTML'de img/sasirma.jpg var, ilk tıklamada bne1.jpg gelecek.
     }
});