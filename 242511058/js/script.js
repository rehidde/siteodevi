// 1. Sayfa yüklendiğinde mesaj
function sayfaYuklendi() {
    console.log("Sayfa başarıyla yüklendi.");
  }
  
  // 2. Ürün bilgisi göster
  <button onclick="myFunction()">Click me</button>


  // 3. Arkaplan rengi değiştir
  function arkaplanDegistir() {
    document.body.style.backgroundColor = "#f0e6ff";
  }
  
  // 4. Sayfa başlığı değiştir
  function baslikDegistir() {
    document.title = "Takı Dünyası - Güncellendi!";
  }
  
  // 5. Scroll konumu göster
  function scrollKonumuGoster() {
    console.log("Scroll Y: " + window.scrollY);
  }
  
  // 6. Formu temizle
  function formTemizle() {
    document.getElementById("iletisimForm").reset();
  }
  
  // 7. Yazıyı büyüt
  function yaziBuyut(el) {
    el.style.fontSize = "20px";
  }
  
  // 8. Yazıyı eski haline getir
  function yaziKucult(el) {
    el.style.fontSize = "16px";
  }
  
  // 9. Görsel değiştir
  function gorselDegistir(id) {
    document.getElementById(id).src = "IMG/bileklik.jpg";
  }
  
  // 10. Sayfayı en üste kaydır
  function enUsteGit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // JQuery fonksiyonları (5 farklı)
  $(document).ready(function() {
    // 1. Fareyle üzerine gelince gizle
    $(".card").hover(function() {
      $(this).find("p").fadeOut();
    }, function() {
      $(this).find("p").fadeIn();
    });
  
    // 2. Başlık çift tıklamayla gizlenip gösterilsin
    $("h1").dblclick(function() {
      $(this).toggle("slow");
    });
  
    // 3. Butona tıklanınca tablo gizlensin
    $(".btn-primary").click(function() {
      $("table").fadeToggle(500);
    });
  
    // 4. Input odaklanınca arkaplan değişsin
    $("input").focus(function() {
      $(this).css("background-color", "#e0f7fa");
    });
  
    // 5. Mouse çıkınca rengi eski haline getir
    $("input").blur(function() {
      $(this).css("background-color", "#fff");
    });
  });
  
  // Sayfa yüklendiğinde fonksiyonu çalıştır
  window.onload = sayfaYuklendi;
  