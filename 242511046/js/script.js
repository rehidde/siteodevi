// JavaScript Fonksiyonları

// 1. Ürün ekleme fonksiyonu
function urunEkle(urunAdi, urunFiyati) {
    alert(urunAdi + " eklenmiştir, fiyatı: " + urunFiyati);
}

// 2. Tabloda satır sayısını hesaplayan fonksiyon
function satirSayisiHesapla() {
    var tablo = document.getElementById('urunTablosu');
    alert("Tablodaki satır sayısı: " + tablo.rows.length);
}

// 3. Sayfayı yenileyen fonksiyon
function sayfayiYenile() {
    location.reload();
}

// 4. Çeşitli ürünler arasında geçiş yapma fonksiyonu
function urunGeçis() {
    var urunler = ["Çikolatalı Kek", "Meyveli Kek", "Fındıklı Kek", "Vanilyalı Kek"];
    var rastgele = urunler[Math.floor(Math.random() * urunler.length)];
    alert("Bugünün ürünü: " + rastgele);
}

// 5. Kullanıcı formunu sıfırlama fonksiyonu
function formuSifirla() {
    document.getElementById('iletisimFormu').reset();
}

// 6. Ürünlerin fiyatlarını listeleyen fonksiyon
function fiyatListele() {
    var urunler = [
        {isim: "Çikolatalı Kek", fiyat: "15 TL"},
        {isim: "Meyveli Kek", fiyat: "20 TL"},
        {isim: "Fındıklı Kek", fiyat: "18 TL"}
    ];
    var urunListesi = urunler.map(function(urun) {
        return urun.isim + ": " + urun.fiyat;
    });
    alert("Ürün Fiyatları: " + urunListesi.join(', '));
}

// 7. Zamanlayıcı fonksiyonu
function zamanlayici() {
    setTimeout(function() {
        alert("5 saniye geçti!");
    }, 5000);
}

// 8. Sayfa başına gitme fonksiyonu
function sayfaBasinaGit() {
    window.scrollTo(0, 0);
}

// 9. Ürün detaylarına gitme fonksiyonu
function urunDetayinaGit(urunId) {
    alert("Ürünün detaylarına gitmek için: " + urunId);
}

// 10. Basit bir sayı hesaplama fonksiyonu
function sayiHesapla(a, b) {
    alert("Toplam: " + (a + b));
}


// jQuery Fonksiyonları

// 1. Sayfa yüklendiğinde alert gösterme
$(document).ready(function() {
    alert("Hoşgeldiniz!");
});

// 2. Ürün fiyatlarını görünür yapma
$('#fiyatButonu').click(function() {
    $('#urunFiyatlari').show();
});

// 3. Form gönderildiğinde mesaj gösterme
$('#iletisimFormu').submit(function(event) {
    event.preventDefault();
    alert("Form başarıyla gönderildi!");
});

// 4. Sayfayı kaydırma
$('#scrollButonu').click(function() {
    $('html, body').animate({ scrollTop: $('#urunListesi').offset().top }, 1000);
});

// 5. Hover efekti
$('.urun').hover(
    function() {
        $(this).css('background-color', 'lightgray');
    },
    function() {
        $(this).css('background-color', 'white');
    }
);



// Favorilere ürün ekleme fonksiyonu (İNTERAKTİF DEĞİL ÖYLESİNE ÇÜNKÜ ÇOK KARIŞIK)
function favorilereEkle(button) {
    const card = button.closest('.card'); // Butona en yakın 'card' divini seç
    const baslik = card.querySelector('.card-title').innerText; // Ürün başlığını al
    let favoriler = JSON.parse(localStorage.getItem('favoriler')) || []; // LocalStorage'den favorileri oku ya da boş dizi

    // Eğer ürün zaten ekliyse, tekrar ekleme
    if (favoriler.includes(baslik)) {
        alert('Bu ürün zaten favorilerde!'); // Uyarı ver
        return;
    }

    favoriler.push(baslik); // Ürünü favorilere ekle
    localStorage.setItem('favoriler', JSON.stringify(favoriler)); // LocalStorage'a favori listesini kaydet

    const favoriDurumu = card.querySelector('.favoriDurumu'); // Ürünün yanındaki span
    favoriDurumu.innerText = 'Favorilere eklendi!'; // Mesaj göster
    setTimeout(() => { favoriDurumu.innerText = ''; }, 1500); // 1.5 saniye sonra mesajı temizle
} 




