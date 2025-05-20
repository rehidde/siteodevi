document.addEventListener("DOMContentLoaded", function() {
    acilisFonk();
});

//todo - Aşağıdaki bir fonksiyon
function acilisFonk(){
    let DogruMu = confirm("Sayfaya hoşgeldiniz bu bir projedir. Baslamadan once bütçenizi kontrol etmek ister misin?");

    if(DogruMu == true)
    {
        alert("Dogru secim yaptiniz. Baslayalim...");

    let AlinanDeger = Number(prompt("Karavanla gezmek için bütçeniz ne kadar?"));

    if(AlinanDeger >= 5000)
    {
        alert("Seyahete Başlayalım");
    }

    else
    {
        alert("Yetersiz Bakiye");
    }
    }

    else
    {
        
        console.log("Bir dahaki sefere gorusmek uzere");
    }
}


  let sayac = 0;
    function sayaciArtir() {
      sayac++;
      document.getElementById("sayac").textContent = sayac;
    }


    function yaziGosterGizle() {
        let yazi = document.getElementById("gizliYazi");
        if (yazi.style.display === "none") {
          yazi.style.display = "block";
        } else {
          yazi.style.display = "none";
        }
      }
    

    

      function yaziRenginiDegistir() {
        document.body.style.color = "#800080"; // mor
      }

      let sayac1 = 0;
      function sayacArttir() {
        sayac++;
        document.getElementById("sayac1").textContent = sayac;
      }


       
    function toggleYazi() {
        let paragraf = document.getElementById("gizliParagraf");
        paragraf.style.display = (paragraf.style.display === "none") ? "block" : "none";
      }
  
      
      function sayfayiYenile() {
        location.reload();
      }
  
      
      function rastgeleSayi() {
        const sayi = Math.floor(Math.random() * 100) + 1;
        document.getElementById("sayiSonucu").textContent = "🎲 Üretilen Sayı: " + sayi;
      }
  
      
      function saatGoster() {
        const simdi = new Date();
        document.getElementById("saatSonucu").textContent = "📅 " + simdi.toLocaleString();
      }

      function faktAl(){
        let sonuc = 1;
        let deger = Number(prompt("Lutfen Faktoriyelini Almak Istediginiz Degeri Giriniz : "));
        
        if(deger == 0)
        {
            alert("Sonuc 1");
        }
        else if(deger < 0)
        {
            alert("Lutfen Gecerli bir deger giriniz. ");
        }
        else
        {
            for(let i = deger; i >0 ; i-- )
            {
                sonuc *= deger;
                deger--;
            }
            alert("Sonuc : "+sonuc);
        }
      }
