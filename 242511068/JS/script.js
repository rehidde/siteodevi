let clickSayaci = 0;
let yeniDivSayaci = 0;

function initializePage() {
    console.log("DOM fully loaded and parsed. Initializing page...");
    tarihGoster();
    saatGoster();
    temaUygula();

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', temaDegistir);
    }

    const iletisimForm = document.getElementById('iletisimForm');
    if (iletisimForm) {
        var kvkkModalElement = document.getElementById('kvkkModal');
        if (kvkkModalElement) {
        }

        
        iletisimForm.addEventListener('submit', function (event) {
            if (!iletisimForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                console.warn("Form validation failed.");
                
                 const invalidInputs = iletisimForm.querySelectorAll(':invalid');
                 invalidInputs.forEach(input => {
                     // console.log(input.id + " is invalid.");
                 });

            } else {
                
                console.log("Bootstrap validation passed. jQuery will handle submission.");
            }
            iletisimForm.classList.add('was-validated');
        }, false);
    }


   
    var imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function (event) {
            try {
                var triggerImage = event.relatedTarget;
                var imgSrc = triggerImage.getAttribute('data-img-src');
                var imgAlt = triggerImage.getAttribute('data-img-alt') || "Ornitorenk Görseli";

                var modalImageElement = imageModal.querySelector('#modalImage');
                var modalTitleElement = imageModal.querySelector('.modal-title');

                modalImageElement.src = imgSrc;
                modalImageElement.alt = imgAlt;
               
                const titleSpan = modalTitleElement.querySelector('span');
                if (titleSpan) {
                    modalTitleElement.innerHTML = `<i class="fas fa-image"></i> <span>${imgAlt}</span>`;
                } else {
                     modalTitleElement.textContent = imgAlt;
                }
                console.log("Image modal shown for: " + imgSrc);
            } catch (e) {
                console.error("Error setting up image modal:", e);
            }
        });
    }

   
    const footerYil = document.getElementById('footerYil') || document.getElementById('footerYilIletisim');
    if (footerYil) {
        footerYil.textContent = new Date().getFullYear();
    }

    console.log("Page initialization complete.");
}

window.addEventListener('DOMContentLoaded', initializePage);

window.addEventListener('scroll', function() {
    let mybutton = document.getElementById("backToTopBtn");
    if (mybutton) {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            mybutton.style.display = "block";
           
        } else {
            mybutton.style.display = "none";
            // mybutton.style.opacity = "0";
        }
    }
   
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// 1. Arkaplan Rengini Değiştirme (Daha canlı renkler ve body'e class ekleme)
function renkDegistir() {
    const renkler = ['#E3F2FD', '#FFF9C4', '#E8F5E9', '#FFEBEE', '#EDE7F6', '#FCE4EC', '#E0F7FA'];
    // const randomRenk = renkler[Math.floor(Math.random() * renkler.length)];
    // document.body.style.backgroundColor = randomRenk;
    
    // Alternatif: body'e class ekleyerek CSS'ten yönetmek (animasyonlu geçiş için daha iyi)
    document.body.classList.remove('bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 'bg-color-5');
    const randomRenkClass = `bg-color-${Math.floor(Math.random() * 5) + 1}`;
    document.body.classList.add(randomRenkClass);
    // CSS'e bu class'ları eklemeyi unutmayın: .bg-color-1 { background-color: #E3F2FD; transition: background-color 0.5s ease; } vb.
    console.log(`Arkaplan rengi class'ı değiştirildi: ${randomRenkClass}.`);
}

// 2. ID'si Verilen Elementin Yazısını Değiştirme (Daha interaktif)
function yaziyiDegistir(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const orijinalText = element.innerHTML; // span'ları korumak için innerHTML
        const yeniTextler = [
            "<span>Ornitorenkler</span> <span>Harikadır!</span> <i class='fas fa-grin-stars'></i>",
            "<span>Doğanın</span> <span>Eşsiz</span> <span>Canlıları</span> <i class='fas fa-leaf'></i>",
            "<span>Keşfetmeye</span> <span>Devam</span> <span>Edin!</span> <i class='fas fa-search'></i>"
        ];
        let yeniText = yeniTextler[Math.floor(Math.random() * yeniTextler.length)];
        // Eğer aynı metin gelirse farklı bir tane seç (basit bir kontrol)
        if (yeniText === orijinalText && yeniTextler.length > 1) {
            yeniText = yeniTextler[(Math.floor(Math.random() * yeniTextler.length) + 1) % yeniTextler.length];
        }
        element.innerHTML = yeniText;
        element.classList.add('text-pulsate'); // Animasyon için class
        setTimeout(() => element.classList.remove('text-pulsate'), 500);
        console.log(`'${elementId}' içeriği değiştirildi: ${yeniText}`);
    } else {
        console.error(elementId + " ID'li element bulunamadı.");
    }
}

// 3. Elementin Yazı Boyutunu Büyütme/Animasyon (CSS ile daha iyi)
function buyut(elem) {
    // elem.style.fontSize = "2.3rem"; // H2 için uygun bir boyut
    // elem.style.color = "#007bff";
    elem.classList.add('title-hover-effect');
    console.log("Yazı efekti aktif:", elem);
}

// 4. Elementin Yazı Boyutunu Küçültme/Animasyon (CSS ile daha iyi)
function kucult(elem) {
    // elem.style.fontSize = "2.2rem"; // H2 için orijinal boyut (CSS'ten almalı)
    // elem.style.color = ""; // Orijinal rengine döner (CSS'ten almalı)
    elem.classList.remove('title-hover-effect');
    console.log("Yazı efekti pasif:", elem);
}

// 5. ID'si Verilen Formu Temizleme (Daha kullanıcı dostu mesaj)
function formTemizle(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        // Bootstrap validasyon class'larını temizle
        form.classList.remove('was-validated');
        const formSonuc = document.getElementById('formSonuc');
        if (formSonuc) {
            formSonuc.innerHTML = '<div class="alert alert-info alert-dismissible fade show" role="alert"><span>Form</span> <span>alanları</span> <span>temizlendi</span>. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        } else {
            alert("Form temizlendi!");
        }
        console.log(formId + " formu temizlendi.");
    } else {
        console.error(formId + " ID'li form bulunamadı.");
    }
}

// 6. ID'si Verilen Div'i Gizleme (Animasyonlu)
function divGizle(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // element.style.display = "none"; // Direkt gizleme yerine animasyon
        $(element).slideUp(500); // jQuery ile animasyonlu gizleme
        console.log(elementId + " gizlendi (slideUp).");
    } else {
         console.error(elementId + " ID'li element bulunamadı (divGizle).");
    }
}

// 7. ID'si Verilen Div'i Gösterme (Animasyonlu)
function divGoster(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // element.style.display = "block"; // Direkt gösterme yerine animasyon
        $(element).slideDown(500); // jQuery ile animasyonlu gösterme
        console.log(elementId + " gösterildi (slideDown).");
    } else {
        console.error(elementId + " ID'li element bulunamadı (divGoster).");
    }
}

// 8. Sayfaya Yeni Bir Div Ekleme (AOS animasyonu ile)
function yeniDivEkle() {
    yeniDivSayaci++;
    const yeniDiv = document.createElement("div");
    yeniDiv.className = "platypus-fact-container mt-2"; // Bootstrap class'ı
    yeniDiv.setAttribute('data-aos', 'fade-left'); // AOS animasyonu
    // yeniDiv.setAttribute('data-aos-delay', (yeniDivSayaci * 50).toString()); // Artan delay (opsiyonel)
    
    const rastgeleBilgiler = [
        "<span>Ekstra</span> <span>Bilgi</span> <span>#"+yeniDivSayaci+":</span> <span>Ornitorenklerin</span> <span>gagaları</span> <span>çok</span> <span>hassastır</span> <span>ve</span> <span>yaklaşık</span> <span>40,000</span> <span>elektroreseptör</span> <span>içerir</span>.",
        "<span>Ekstra</span> <span>Bilgi</span> <span>#"+yeniDivSayaci+":</span> <span>Bir</span> <span>ornitorenk</span> <span>su</span> <span>altında</span> <span>nefesini</span> <span>birkaç</span> <span>dakika</span> <span>tutabilir</span>.",
        "<span>Ekstra</span> <span>Bilgi</span> <span>#"+yeniDivSayaci+":</span> <span>Ornitorenkler</span> <span>mükemmel</span> <span>dalgıçlardır</span> <span>ve</span> <span>yiyeceklerini</span> <span>genellikle</span> <span>geceleri</span> <span>arılar</span>."
    ];
    yeniDiv.innerHTML = rastgeleBilgiler[Math.floor(Math.random() * rastgeleBilgiler.length)];

    const divlerContainer = document.getElementById("divler");
    if (divlerContainer) {
        divlerContainer.appendChild(yeniDiv);
        AOS.refresh(); // Yeni eklenen elementler için AOS'u yenile
        console.log("Yeni div eklendi ve AOS ile anime edildi.");
        // Yeni eklenen div'e scroll yap (opsiyonel)
        // yeniDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        console.error("'divler' ID'li container bulunamadı.");
        // document.body.appendChild(yeniDiv); // Fallback, ama konteynere eklemek daha iyi
    }
}

// 9. ID'si Verilen Elemente Tarihi Yazdırma (Formatlı)
function tarihGoster() {
    const tarihElementi = document.getElementById("tarih");
    if (tarihElementi) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        tarihElementi.innerHTML = `<span>${now.toLocaleDateString('tr-TR', options)}</span>`;
        console.log("Tarih gösterildi.");
    }
}

// 10. Saati Gösterme (Dinamik olarak güncellenen)
function saatGoster() {
    const saatElementi = document.getElementById("saat") || document.getElementById("saat-iletisim");
    if (saatElementi) {
        const updateSaat = () => {
            saatElementi.innerHTML = `<span>${new Date().toLocaleTimeString('tr-TR')}</span>`;
        };
        updateSaat(); // İlk yüklemede hemen göster
        setInterval(updateSaat, 1000); // Her saniye güncelle
        console.log("Saat gösteriliyor ve güncelleniyor.");
    }
}

// 11. KVKK Modal'ını Gösterme (Bootstrap 5 ile uyumlu ve dinamik tarih eklenmiş)
function kvkkModalGoster(event) {
    if(event) event.preventDefault(); // Eğer bir linkten çağrılıyorsa sayfa başa sarmasın
    var kvkkModalElement = document.getElementById('kvkkModal');
    if (kvkkModalElement) {
        var modalInstance = bootstrap.Modal.getInstance(kvkkModalElement);
        if (!modalInstance) {
             modalInstance = new bootstrap.Modal(kvkkModalElement);
        }
        modalInstance.show();
        console.log("KVKK Modal gösterildi.");

        // Dinamik "Son Güncelleme Tarihi"
        const kvkkDateElement = document.getElementById('kvkkModalLastUpdateDate');
        if (kvkkDateElement) {
            const now = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            kvkkDateElement.textContent = now.toLocaleDateString('tr-TR', options);
            console.log("KVKK Modal Son Güncelleme Tarihi ayarlandı: " + kvkkDateElement.textContent);
        } else {
            console.warn("kvkkModalLastUpdateDate elementi bulunamadı.");
        }

    } else {
        console.error("KVKK Modal elementi bulunamadı.");
    }
}

// 12. Yukarı Çık Butonu - Scroll to Top Fonksiyonu
function scrollToTop() {
  // document.body.scrollTop = 0; // Safari için
  // document.documentElement.scrollTop = 0; // Diğerleri için
  // Daha yumuşak bir kaydırma için:
  window.scrollTo({ top: 0, behavior: 'smooth' });
  console.log("Sayfa yumuşak bir şekilde yukarı kaydırıldı.");
}

// 13. Tema Değiştirme Fonksiyonu (Gelişmiş ikon ve metin değişimi)
function temaDegistir() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-text') : null;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (themeText) themeText.textContent = isDark ? 'Açık Tema' : 'Koyu Tema';
    if (themeIcon) {
        themeIcon.classList.toggle('fa-moon', !isDark);
        themeIcon.classList.toggle('fa-sun', isDark);
    }
    console.log(`Tema ${isDark ? 'koyu' : 'açık'} olarak değiştirildi.`);
    // Dinamik arkaplan class'ını kaldır/ekle (opsiyonel)
    // if (isDark) document.body.classList.remove('animated-bg');
    // else document.body.classList.add('animated-bg');
}

// 14. Tema Uygulama Fonksiyonu (Sayfa yüklendiğinde)
function temaUygula() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-text') : null;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let useDarkTheme = false;
    if (savedTheme) {
        useDarkTheme = savedTheme === 'dark';
    } else {
        useDarkTheme = prefersDark; // Kullanıcının OS tercihini kullan
    }

    if (useDarkTheme) {
        body.classList.add('dark-theme');
        if (themeText) themeText.textContent = 'Açık Tema';
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.remove('dark-theme');
        if (themeText) themeText.textContent = 'Koyu Tema';
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        // document.body.classList.add('animated-bg'); // Açık temada animasyonlu bg (opsiyonel)
    }
    console.log(`Tema ${useDarkTheme ? 'koyu' : 'açık'} olarak uygulandı (kayıtlı/tercih edilen).`);
}

// 15. Verilen bir metindeki kelime sayısını bulan fonksiyon
function kelimeSayaci(metinId, sonucId) {
    const metinElement = document.getElementById(metinId);
    const sonucElement = document.getElementById(sonucId);
    if (metinElement && sonucElement) {
        const metin = metinElement.value || metinElement.innerText;
        const kelimeler = metin.trim().split(/\s+/).filter(Boolean); // Boşlukları ve baştaki/sondaki boşlukları temizle
        sonucElement.innerHTML = `<span>Kelime</span> <span>sayısı:</span> <strong>${kelimeler.length}</strong>`;
        console.log(`'${metinId}' içindeki kelime sayısı: ${kelimeler.length}`);
    } else {
        console.warn("Kelime sayacı için metin veya sonuç elementi bulunamadı.");
    }
}


// 16. Rastgele bir "Ornitorenk Gerçeği" gösteren fonksiyon (Modal içinde veya alert ile)
function rastgeleOrnitorenkGercegiGoster() {
    const gercekler = [
        "<span>Ornitorenkler</span> <span>mükemmel</span> <span>yüzücülerdir</span> <span>ve</span> <span>avlarını</span> <span>su</span> <span>altında</span> <span>yakalarlar</span>.",
        "<span>Erkek</span> <span>ornitorenklerin</span> <span>arka</span> <span>ayaklarında</span> <span>zehirli</span> <span>mahmuzlar</span> <span>bulunur</span>.",
        "<span>Ornitorenkler</span>, <span>yumurtlayan</span> <span>memeliler</span> <span>olan</span> <span>monotremlerdendir</span>.",
        "<span>Gagaları</span>, <span>avlarının</span> <span>kas</span> <span>kasılmalarından</span> <span>kaynaklanan</span> <span>zayıf</span> <span>elektrik</span> <span>alanlarını</span> <span>algılayabilir</span>.",
        "<span>Ornitorenkler</span>, <span>Avustralya'ya</span> <span>özgü</span> <span>hayvanlardır</span>."
    ];
    const secilenGercek = gercekler[Math.floor(Math.random() * gercekler.length)];
    // Basit bir alert ile gösterme
    // alert("Biliyor muydunuz?\n" + secilenGercek.replace(/<\/?span>/g, "")); // span'ları temizle

    // Veya bir modal içinde gösterme (eğer bir modalınız varsa)
    const bilgiModalGovdesi = document.getElementById('bilgiModalGovdesi'); // HTML'de böyle bir ID'li div olmalı
    const bilgiModalBasligi = document.getElementById('bilgiModalBasligi'); // HTML'de böyle bir ID'li h5 olmalı
    if (bilgiModalGovdesi && bilgiModalBasligi) {
        bilgiModalBasligi.innerHTML = "<span>Ornitorenk</span> <span>Gerçeği</span>";
        bilgiModalGovdesi.innerHTML = `<p>${secilenGercek}</p>`;
        var modalElement = document.getElementById('genelBilgiModal'); // Modal'ın ID'si
        if(modalElement){
            var modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modalInstance.show();
        }
    } else {
        // Fallback to alert if modal elements are not found
        alert("Biliyor muydunuz?\n" + secilenGercek.replace(/<\/?span>/g, ""));
    }
    console.log("Rastgele ornitorenk gerçeği gösterildi.");
}

function sesliHarfAvcisi(metin) {
    if (typeof metin !== 'string') {
        console.warn("sesliHarfAvcisi: Geçerli bir metin girilmedi.");
        return 0;
    }
    const sesliHarfler = "aeıioöuüAEIİOÖUÜ";
    let sayac = 0;
    for (let i = 0; i < metin.length; i++) {
        if (sesliHarfler.includes(metin[i])) {
            sayac++;
        }
    }
    console.log(`'${metin}' içindeki sesli harf sayısı: ${sayac}`);
    return sayac;
}

// JQUERY FONKSİYONLARI
$(document).ready(function() {
    // 1. H1 başlığını ve header bölümünü yavaşça görünür yapma
    $("header").hide().delay(200).fadeIn(1200); // Header'ı biraz gecikmeli ve daha yavaş getir
    console.log("jQuery: Header fadeIn efekti uygulandı.");

    // 2. Form gönderme (Bootstrap validasyonu ile entegre)
    $("#iletisimForm").submit(function(e) {
        e.preventDefault(); // Bootstrap zaten yapıyor ama garanti olsun
        var form = this;
        var formSonucDiv = $('#formSonuc');
        formSonucDiv.html(''); // Önceki mesajları temizle

        if (!form.checkValidity()) {
            console.warn("jQuery: Form gönderimi engellendi, Bootstrap validasyonu başarısız.");
            formSonucDiv.html('<div class="alert alert-danger"><span>Lütfen</span> <span>formdaki</span> <span>hataları</span> <span>düzeltin</span>.</div>');
            // Hatalı ilk inputa odaklan (kullanıcı deneyimi için)
            $(form).find('.form-control:invalid, .form-select:invalid').first().focus();
            return; // Göndermeyi durdur
        }

        console.log("jQuery: Form validasyonu başarılı, gönderim simülasyonu başlıyor.");
        var formData = $(this).serializeArray(); // Form verilerini al
        console.log("Form Verileri:", formData);

        $(this).slideUp(600, function() {
            formSonucDiv.html('<div class="alert alert-success mt-3 p-4 text-center"><i class="fas fa-check-circle fa-2x mb-2"></i><br><span>Formunuz</span> <span>başarıyla</span> <span>gönderildi!</span> (<span>Bu</span> <span>bir</span> <span>simülasyondur</span>). <span>Teşekkür</span> <span>ederiz</span>.</div>').slideDown();
            console.log("jQuery: Form gönderildi (simülasyon).");
            
            setTimeout(function() {
                formSonucDiv.slideUp(function(){ $(this).html(''); });
                $(form).trigger("reset").slideDown(600);
                form.classList.remove('was-validated'); // Validasyon stillerini temizle
            }, 7000); // 7 saniye sonra
        });
    });


    // 3. Tablo satırlarının üzerine gelince arkaplan değiştirme (daha yumuşak geçiş CSS'te)
    $("table.table-hover tbody tr").hover(
        function() { $(this).addClass('highlight-jquery'); },
        function() { $(this).removeClass('highlight-jquery'); }
    );
    console.log("jQuery: Tablo satırı hover efekti (class ile) aktif.");

    // 4. Scroll ile footer'ı gizle/göster (daha pürüzsüz)
    var footer = $("footer");
    if (footer.length) { // Footer varsa çalışsın
        var footerVisible = true;
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                if (!footerVisible) {
                    footer.fadeIn(400);
                    footerVisible = true;
                }
                return; 
            }

            if ($(this).scrollTop() > 250) { // Biraz daha aşağıda tetiklensin
                if (footerVisible) {
                    footer.fadeOut(400);
                    footerVisible = false;
                    // console.log("jQuery: Footer gizlendi.");
                }
            } else {
                if (!footerVisible) {
                    footer.fadeIn(400);
                    footerVisible = true;
                    // console.log("jQuery: Footer gösterildi.");
                }
            }
        });
    }


    // 5. (Ek jQuery) "Hızlı Linkler" bölümündeki linklere smooth scroll ve aktif class
    $('aside .list-unstyled a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Navbar yüksekliği kadar offset
            }, 800, 'swing', function() {
                // window.location.hash = target.attr('id');
            });

           
            $('aside .list-unstyled a').removeClass('active-link');
            $(this).addClass('active-link');
            // CSS'e .active-link { font-weight: bold; color: #007bff !important; } ekleyin
        }
    });
    console.log("jQuery: Hızlı linkler için smooth scroll ve aktif class özelliği eklendi.");

    // 6. (Ek jQuery) Butonlara tıklandığında hafif bir "bastırılma" efekti
    $('.btn').on('mousedown', function() {
        $(this).addClass('btn-pressed'); // CSS'e .btn-pressed { transform: scale(0.97); box-shadow: 0 2px 5px rgba(0,0,0,0.1) inset; }
    }).on('mouseup mouseleave', function() {
        $(this).removeClass('btn-pressed');
    });
    console.log("jQuery: Butonlara basılma efekti eklendi.");
    
    // 7. (Ek jQuery) Anasayfadaki "İlginç Bilgiler" kutularına tıklandığında içeriği genişlet/daralt
    $('#divler .platypus-fact-container').each(function(index) {
        if (index >= 5) {
        }
        // $(this).data('original-text', $(this).html()); // Orijinal metni sakla (gerekirse)
    });

    // Şimdilik bu fonksiyonu basit tutalım: tıklayınca bir alert versin.
    $('#divler').on('click', '.platypus-fact-container', function() {
        // $(this).toggleClass('expanded-fact'); // CSS ile .expanded-fact tanımlanabilir.
        // İçeriği değiştirmek veya daha fazla bilgi göstermek için kullanılabilir.
        const factText = $(this).text().trim().substring(0, 50) + "..."; // İlk 50 karakter
        // alert("Bu ilginç bilgiye tıkladınız: " + factText);
        // Daha iyi bir UX için: Tıklanan kutuya hafif bir animasyon
        $(this).animate({ opacity: 0.7 }, 150).animate({ opacity: 1 }, 150);
    });
    console.log("jQuery: İlginç bilgi kutularına tıklama efekti eklendi.");

});

$(window).on('load', function() {
    console.log("Window fully loaded (including images and other resources).");
    // $('#page-loader').fadeOut(500); // HTML'de <div id="page-loader">...</div> olmalı
});