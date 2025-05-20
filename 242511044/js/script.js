let mevcutAtmosfer = 'light'; // light veya dark olabilir
let etkilesimAdedi = 0; // Kullanıcı tıklama sayacı
let formDegisikligiYapildi = false; // İletişim formunda değişiklik yapılıp yapılmadığını izler

// Sayfa ilk yüklendiğinde çağrılacak ana hazırlık fonksiyonu (index.html için)
function ortamiHazirla() {
    console.log('Mekan canlandı ve ortamiHazirla() devrede.');
    zamanaMühürVur(); // Yılı güncelle (hem index hem iletişim için)
    kaydirincaSeyirDefteriAnimasyonu(); // Navbar scroll efekti
    sahneyeGirisSeremonisi(); // Sadece index.html için anlamlı olabilir ama genel çağrılabilir
    cihazinKimliğiniKaydet(); // Tarayıcı bilgilerini logla
    
    const hafizadakiAtmosfer = sandiktanCikar('blogSecilenAtmosfer');
    if (hafizadakiAtmosfer) {
        mevcutAtmosfer = hafizadakiAtmosfer;
        if (mevcutAtmosfer === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    
    window.onscroll = function() { yolculukIlerlemesiniGoster(); };
    zamaninAkisiniGoster(); // Saati anında göster
    setInterval(zamaninAkisiniGoster, 1000); // Saati her saniye güncelle
    ipucuFisildayicilariniEtkinlestir(); // Tooltip'leri etkinleştir
}

// İletişim sayfası yüklendiğinde çağrılacak fonksiyon (iletisim.html için)
function initializePage() {
    console.log('İletişim sayfası için initializePage() çağrıldı.');
    ortamiHazirla(); // Genel hazırlıkları yap

    // İletişim sayfasına özel ek başlatma kodları:
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('İletişim formu için özel olay dinleyicileri ve başlatmalar yapılıyor.');
        // Gerekli alanlara 'blur' ve 'change' (checkbox için) olay dinleyicileri ekle
        contactForm.querySelectorAll('[required]').forEach(element => {
            element.addEventListener('blur', function() { tekBirAlaniYokla(this); });
            if (element.type === 'checkbox') {
                element.addEventListener('change', function() { tekBirAlaniYokla(this); });
            }
        });

        // E-posta ve Telefon için özel denetleyicileri 'blur' olayına bağla
        const emailInput = document.getElementById('inputEmail');
        if(emailInput) emailInput.addEventListener('blur', () => epostaAlaniniDenetle(emailInput));

        const phoneInput = document.getElementById('inputPhone');
        if(phoneInput) phoneInput.addEventListener('blur', () => telefonAlaniniDenetle(phoneInput));
        
        // Karakter sayacını başlat
        if (document.getElementById('textareaMessage') && document.getElementById('charCountDisplay')) {
             harfAdediniGuncelle('textareaMessage', 'charCountDisplay');
        }
        // Memnuniyet slider değerini ve göstergesini başlat
        const satisfactionInput = document.getElementById('inputSatisfaction');
        const satisfactionValueDisplay = document.getElementById('satisfactionValue');
        if (satisfactionInput && satisfactionValueDisplay) {
            satisfactionValueDisplay.textContent = satisfactionInput.value;
            // Slider değeri değiştikçe göstergeyi güncelle
            satisfactionInput.addEventListener('input', function() {
                satisfactionValueDisplay.textContent = this.value;
            });
        }
        // Formdan ayrılma onayı (iletisim.html'e özel)
        ayrilmadanEvvelOnayIste(contactForm);
    }
}


function zamanaMühürVur() {
    const yilDamgasiAnaSayfa = document.getElementById('currentYear');
    const yilDamgasiIletisim = document.getElementById('currentYearContact'); // iletisim.html için
    const guncelYil = new Date().getFullYear();
    if (yilDamgasiAnaSayfa) yilDamgasiAnaSayfa.textContent = guncelYil;
    if (yilDamgasiIletisim) yilDamgasiIletisim.textContent = guncelYil; // İletişim sayfasındaki yılı da günceller
    console.log('Yıl damgası vuruldu.');
}

function gorunumuTazele() {
    document.body.classList.toggle('dark-theme');
    mevcutAtmosfer = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    sandigaKoy('blogSecilenAtmosfer', mevcutAtmosfer);
    console.log(`Atmosfer ${mevcutAtmosfer} olarak ayarlandı.`);
}

function anaBaslikKelamlariniDegistir(yeniKelamlar) {
    const baslikMekani = document.getElementById('mainHeaderText');
    if (baslikMekani) {
        baslikMekani.innerHTML = `<span>${yeniKelamlar.split(' ')[0]}</span> <span>${yeniKelamlar.substring(yeniKelamlar.indexOf(' ') + 1)}</span>`;
        console.log('Ana başlığın kelamları tazelendi:', yeniKelamlar);
    }
}

function fareDokunusunuKaydet(nesneKimligi) {
    etkilesimAdedi++;
    console.log(`Kullanıcı "${nesneKimligi}" nesnesine dokundu. Toplam dokunuş: ${etkilesimAdedi}`);
    const element = document.getElementById(nesneKimligi);
    if (element) { // jQuery bağımlılığını azaltmak için saf JS ile efekt eklenebilir
        element.style.transition = 'opacity 0.1s ease-in-out';
        element.style.opacity = '0.5';
        setTimeout(() => { element.style.opacity = '1'; }, 100);
    }
}

function anlikVakitBilgisiniGetir() {
    const simdi = new Date();
    console.log('Anlık vakit bilgisi alındı:', simdi.toLocaleString('tr-TR'));
    return simdi.toLocaleString('tr-TR');
}

function kartiCazipKil(kartOgesi) {
    kartOgesi.classList.add('card-highlighted');
}

function kartCazibesiniGeriAl(kartOgesi) {
    kartOgesi.classList.remove('card-highlighted');
}

function perdeyiAc(perdeKimligi) {
    $('#' + perdeKimligi).modal('show');
    console.log(`"${perdeKimligi}" perdesi aralandı.`);
}

function perdeyiKapat(perdeKimligi) {
    $('#' + perdeKimligi).modal('hide');
    console.log(`"${perdeKimligi}" perdesi kapandı.`);
}

// HTML'den çağrılan openModal için takma ad
function openModal(modalId) {
    perdeyiAc(modalId);
}

// HTML'den çağrılan hideModal için takma ad
function hideModal(modalId) {
    perdeyiKapat(modalId);
}


function muracaatFormunuTetkikEt() {
    console.log('Müracaat formu tetkike alındı.');
    let herSeyYolundaMi = true;
    
    const elzemAlanlarIDleri = ['inputName', 'inputSurname', 'inputEmail', 'selectInquiry', 'textareaMessage', 'checkTerms'];
    elzemAlanlarIDleri.forEach(kimlik => {
        const alanOgesi = document.getElementById(kimlik);
        if (alanOgesi && !tekBirAlaniYokla(alanOgesi)) {
            herSeyYolundaMi = false;
        }
    });

    const epostaMahalli = document.getElementById('inputEmail');
    if (epostaMahalli && epostaMahalli.value.trim() !== '' && !gecerliBirEpostaMi(epostaMahalli.value)) {
        alaniHataliIsaretle(epostaMahalli, 'Lütfen geçerli bir e-posta adresi giriniz.');
        herSeyYolundaMi = false; 
    } else if (epostaMahalli && epostaMahalli.value.trim() !== '' && epostaMahalli.hasAttribute('required')) {
        // Eğer eposta doluysa ve geçerliyse zaten tekBirAlaniYokla'da is-valid almıştır.
        // Eğer boş değilse ve geçerliyse, ama required değilse, yine de is-valid almalı.
        if(gecerliBirEpostaMi(epostaMahalli.value)) alaniDogruIsaretle(epostaMahalli);
    }
    
    const telefonMahalli = document.getElementById('inputPhone');
    if (telefonMahalli && telefonMahalli.value.trim() !== '' && !gecerliBirTelefonMu(telefonMahalli.value)) {
        alaniHataliIsaretle(telefonMahalli, 'Lütfen geçerli bir telefon numarası giriniz (10-11 haneli).');
        herSeyYolundaMi = false; 
    } else if (telefonMahalli && telefonMahalli.value.trim() !== '') {
        alaniDogruIsaretle(telefonMahalli);
    }

    const dosyaGirdisi = document.getElementById('inputFile');
    if (dosyaGirdisi && !dosyaAgirliginiTart(dosyaGirdisi, true)) { // Sessiz modda kontrol et, mesajı zaten kendisi basar.
         herSeyYolundaMi = false;
    }


    if (herSeyYolundaMi) {
        console.log('Müracaat formu onaylandı.');
        const toplananBilgiler = formdakiVerileriTopla('contactForm');
        console.log('Toplanan Bilgiler:', toplananBilgiler);
        formNeticesiniBildir('Müracaatınız başarıyla gönderildi! (Bu bir canlandırmadır)', 'success');
        formDegisikligiYapildi = false; // Form gönderildiği için değişiklik bayrağını sıfırla
        setTimeout(muracaatFormunuTemizle, 3000); 
        return false; // Formun geleneksel yolla gönderilmesini engelle
    } else {
        console.log('Müracaat formunda eksik/hatalı kısımlar mevcut.');
        formNeticesiniBildir('Lütfen formdaki işaretli kısımları gözden geçiriniz.', 'danger');
        return false; // Formun geleneksel yolla gönderilmesini engelle
    }
}

// HTML'den çağrılan validateContactForm için takma ad
function validateContactForm() {
    return muracaatFormunuTetkikEt();
}


function tekBirAlaniYokla(alanOgesi) {
    if (!alanOgesi) return false;

    let gecerliMi = true;
    let ikazMesaji = '';
    const labelText = alanOgesi.labels && alanOgesi.labels[0] ? alanOgesi.labels[0].textContent.replace('*','').trim() : (alanOgesi.placeholder || alanOgesi.name || 'Bu alan');


    if (alanOgesi.type === 'checkbox') {
        if (alanOgesi.hasAttribute('required') && !alanOgesi.checked) {
            gecerliMi = false;
            ikazMesaji = 'Devam etmek için bu kutucuğu işaretlemeniz gerekmektedir.';
        }
    } else if (alanOgesi.type === 'select-one'){
        if (alanOgesi.hasAttribute('required') && alanOgesi.value === '') {
            gecerliMi = false;
            ikazMesaji = `Lütfen bir "${labelText}" seçiniz.`;
        }
    } else { // text, textarea, email, etc.
        if (alanOgesi.hasAttribute('required') && alanOgesi.value.trim() === '') {
            gecerliMi = false;
            ikazMesaji = `"${labelText}" alanı boş bırakılamaz.`;
        }
    }
    
    if (!gecerliMi) {
        alaniHataliIsaretle(alanOgesi, ikazMesaji);
    } else {
        alaniDogruIsaretle(alanOgesi);
    }
    return gecerliMi;
}

// HTML'den çağrılan validateRequiredField için takma ad
function validateRequiredField(alanId) {
    const alanOgesi = document.getElementById(alanId);
    if (alanOgesi) {
        return tekBirAlaniYokla(alanOgesi);
    }
    return false; // Eleman bulunamazsa
}


function alaniHataliIsaretle(alanOgesi, mesaj) {
    if (!alanOgesi) return;
    alanOgesi.classList.add('is-invalid');
    alanOgesi.classList.remove('is-valid');
    // .form-group içindeki .invalid-feedback'i bul
    const formGroup = alanOgesi.closest('.form-group') || alanOgesi.closest('.form-check');
    let ikazYeri = formGroup ? formGroup.querySelector('.invalid-feedback') : null;
    
    if (ikazYeri && mesaj) {
        ikazYeri.textContent = mesaj;
        ikazYeri.style.display = 'block';
    }
}

function alaniDogruIsaretle(alanOgesi) {
    if (!alanOgesi) return;
    alanOgesi.classList.remove('is-invalid');
    alanOgesi.classList.add('is-valid');
    const formGroup = alanOgesi.closest('.form-group') || alanOgesi.closest('.form-check');
    let ikazYeri = formGroup ? formGroup.querySelector('.invalid-feedback') : null;
    if (ikazYeri) {
        ikazYeri.style.display = 'none';
    }
}


function gecerliBirEpostaMi(epostaMetni) {
    const epostaDeseni = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return epostaDeseni.test(epostaMetni);
}

function epostaAlaniniDenetle(epostaAlaniOgesi) {
    if (!epostaAlaniOgesi) return;
    const epostaDegeri = epostaAlaniOgesi.value;
    const isRequired = epostaAlaniOgesi.hasAttribute('required');

    if (isRequired && epostaDegeri.trim() === '') {
        alaniHataliIsaretle(epostaAlaniOgesi, 'E-posta alanı boş bırakılamaz.');
    } else if (epostaDegeri.trim() !== '' && !gecerliBirEpostaMi(epostaDegeri)) {
        alaniHataliIsaretle(epostaAlaniOgesi, 'Lütfen geçerli bir e-posta adresi giriniz.');
    } else if (epostaDegeri.trim() === '' && !isRequired) { // Boş ve zorunlu değilse, işaretleri kaldır
        epostaAlaniOgesi.classList.remove('is-invalid', 'is-valid');
        const ikazYeri = (epostaAlaniOgesi.closest('.form-group') || epostaAlaniOgesi.parentElement).querySelector('.invalid-feedback');
        if(ikazYeri) ikazYeri.style.display = 'none';
    }
    else { // Geçerli veya boş (ama zorunlu değilse)
        alaniDogruIsaretle(epostaAlaniOgesi);
    }
}
// HTML'den çağrılan validateEmailField için takma ad
function validateEmailField(emailElement) { // HTML'den this (element) gelecek şekilde değiştirilmeli
    epostaAlaniniDenetle(emailElement);
}


function gecerliBirTelefonMu(telefonNumarasi) {
    const telefonDeseni = /^[0-9]{10,11}$/; 
    return telefonDeseni.test(telefonNumarasi.replace(/\s/g, '')); // Boşlukları temizle
}

function telefonAlaniniDenetle(telefonAlaniOgesi) {
    if(!telefonAlaniOgesi) return;
    const telefonDegeri = telefonAlaniOgesi.value;
    if (telefonDegeri.trim() !== '' && !gecerliBirTelefonMu(telefonDegeri)) {
        alaniHataliIsaretle(telefonAlaniOgesi, 'Lütfen geçerli bir telefon numarası giriniz (10-11 haneli, sadece rakam).');
    } else if (telefonDegeri.trim() !== '') {
        alaniDogruIsaretle(telefonAlaniOgesi);
    } else { // Boşsa işaretleri kaldır
        telefonAlaniOgesi.classList.remove('is-invalid', 'is-valid');
        const ikazYeri = (telefonAlaniOgesi.closest('.form-group') || telefonAlaniOgesi.parentElement).querySelector('.invalid-feedback');
        if (ikazYeri) ikazYeri.style.display = 'none';
    }
}
// HTML'den çağrılan validatePhoneField için takma ad
function validatePhoneField(phoneElement) { // HTML'den this (element) gelecek şekilde değiştirilmeli
    telefonAlaniniDenetle(phoneElement);
}


function harfAdediniGuncelle(metinKutusuKimligi, gostergeKimligi) {
    const metinSahasi = document.getElementById(metinKutusuKimligi);
    const adetGostergesi = document.getElementById(gostergeKimligi);
    if (metinSahasi && adetGostergesi) {
        const sinir = parseInt(metinSahasi.getAttribute('maxlength') || '500');
        const mevcutAdet = metinSahasi.value.length;
        adetGostergesi.textContent = `(${mevcutAdet}/${sinir})`;
        if (mevcutAdet > sinir) {
            adetGostergesi.classList.add('text-danger');
            metinSahasi.value = metinSahasi.value.substring(0, sinir); // Fazla karakterleri kes
        } else {
            adetGostergesi.classList.remove('text-danger');
        }
    }
}
// HTML'den çağrılan updateCharacterCount için takma ad
function updateCharacterCount(textareaId, displayId) {
    harfAdediniGuncelle(textareaId, displayId);
}


function gizliKelimeGorunurlugunuAyarla(mahremAlanKimligi) {
    const mahremAlan = document.getElementById(mahremAlanKimligi);
    if (mahremAlan) {
        const gozSimgesi = mahremAlan.closest('.input-group').querySelector('i.fas');
        if (mahremAlan.type === 'password') {
            mahremAlan.type = 'text';
            if(gozSimgesi) gozSimgesi.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            mahremAlan.type = 'password';
            if(gozSimgesi) gozSimgesi.classList.replace('fa-eye-slash', 'fa-eye');
        }
        console.log(`"${mahremAlanKimligi}" alanının görünürlüğü ayarlandı.`);
    }
}
// HTML'den çağrılan togglePasswordVisibility için takma ad
function togglePasswordVisibility(elementId) {
    gizliKelimeGorunurlugunuAyarla(elementId);
}


function sandigaKoy(anahtarIsmi, deger) {
    try {
        localStorage.setItem(anahtarIsmi, JSON.stringify(deger));
        console.log(`Gizli sandığa emanet edildi: {${anahtarIsmi}: ...}`);
    } catch (hata) {
        console.error('Sandığa koyma işlemi başarısız oldu:', hata);
    }
}

function sandiktanCikar(anahtarIsmi) {
    try {
        const bulunanEsya = localStorage.getItem(anahtarIsmi);
        return bulunanEsya ? JSON.parse(bulunanEsya) : null;
    } catch (hata) {
        console.error('Sandıktan çıkarma işlemi başarısız oldu:', hata);
        return null;
    }
}

function sandiktanSil(anahtarIsmi) {
    try {
        localStorage.removeItem(anahtarIsmi);
        console.log(`Sandıktan "${anahtarIsmi}" silindi.`);
    } catch (hata) {
        console.error('Sandıktan silme işlemi başarısız oldu:', hata);
    }
}

function tumSandigiBosalt() {
    try {
        localStorage.clear();
        console.log('Tüm gizli sandık boşaltıldı.');
    } catch (hata) {
        console.error('Sandığı boşaltma işlemi başarısız oldu:', hata);
    }
}

function mekanaIsinla(mekanKimligi) {
    const hedefMekan = document.getElementById(mekanKimligi);
    if (hedefMekan) {
        const navbarHeight = document.getElementById('mainNav') ? document.getElementById('mainNav').offsetHeight : 70;
        const hedefPozisyon = hedefMekan.offsetTop - navbarHeight;
        window.scrollTo({
            top: hedefPozisyon,
            behavior: 'smooth'
        });
        // Aktif linki güncelleme (jQuery bağımlıydı, saf JS'e çevrilebilir veya bırakılabilir)
        $('.nav-link').removeClass('active');
        $(`.nav-link[href="#${mekanKimligi}"]`).addClass('active');
        console.log(`"${mekanKimligi}" mekanına ışınlanıldı.`);
    }
}

function hariciKapidanGec(kapiAdresi) {
    if (confirm(`"${kapiAdresi}" adresine yönlendirileceksiniz. Bu site yeni bir sekmede açılacaktır. Devam etmek istiyor musunuz?`)) {
        window.open(kapiAdresi, '_blank', 'noopener,noreferrer');
        console.log(`Harici kapı açıldı: ${kapiAdresi}`);
    } else {
        console.log(`Harici kapıdan geçiş iptal edildi: ${kapiAdresi}`);
    }
}

function sahneyeGirisSeremonisi() {
    // Bu fonksiyon jQuery animasyonları kullanıyordu. Basit bir CSS animasyonu veya saf JS ile değiştirilebilir.
    // Şimdilik konsol logu olarak bırakıyorum veya CSS ile yapılabilir.
    const headerText = document.getElementById('mainHeaderText');
    const subText = document.querySelector('.masthead .div-block-1');
    if(headerText) {
        headerText.style.opacity = 0;
        headerText.style.transition = 'opacity 0.8s 0.2s ease-out';
        setTimeout(() => headerText.style.opacity = 1, 50); // CSS transition'u tetikle
    }
    if(subText) {
        subText.style.opacity = 0;
        subText.style.transition = 'opacity 0.8s 0.5s ease-out';
         setTimeout(() => subText.style.opacity = 1, 50);
    }
    console.log('Sahneye giriş seremonisi (basit fade-in) çalıştı.');
}

function cetveleYeniKayitEkle() {
    const cetvelGovdesi = document.querySelector('#kavramlarTable tbody');
    if (cetvelGovdesi) {
        const satirSayisi = cetvelGovdesi.rows.length;
        const yeniSatir = cetvelGovdesi.insertRow();
        yeniSatir.style.display = 'none'; // jQuery fadein için başlangıç

        yeniSatir.insertCell().innerHTML = `<span>${satirSayisi + 1}</span>`;
        yeniSatir.insertCell().innerHTML = `<span>Dinamik Kavram</span> <i class="fas fa-bolt text-warning"></i>`;
        yeniSatir.insertCell().innerHTML = `<span>Bu kavram JavaScript ile eklendi.</span>`;
        yeniSatir.insertCell().innerHTML = `<span class="badge badge-primary">Yeni</span>`;
        
        // jQuery fadeIn efekti
        $(yeniSatir).fadeIn(1000);
        console.log('Cetvele JavaScript ile yeni kayıt eklendi ve jQuery ile gösterildi.');
    }
}

function goruntuKutusuManzarasiniDegistir(yeniManzaraAdresi) {
    const goruntuKutusu = document.getElementById('contentIframe');
    if (goruntuKutusu) {
        goruntuKutusu.src = yeniManzaraAdresi;
        console.log(`Görüntü kutusunun manzarası değişti: ${yeniManzaraAdresi}`);
        goruntuKutusu.classList.add('iframe-reloaded-effect'); // CSS'te bu class tanımlı olmalı
        setTimeout(() => goruntuKutusu.classList.remove('iframe-reloaded-effect'), 1000);
    }
}

function formdakiVerileriTopla(formKimligi) {
    const basvuruFormu = document.getElementById(formKimligi);
    if (!basvuruFormu) return null;
    const toplananlar = new FormData(basvuruFormu);
    const bilgiKasesi = {};
    for (let [anahtar, deger] of toplananlar.entries()) {
        if (bilgiKasesi[anahtar]) {
            if (!Array.isArray(bilgiKasesi[anahtar])) {
                bilgiKasesi[anahtar] = [bilgiKasesi[anahtar]];
            }
            bilgiKasesi[anahtar].push(deger);
        } else {
            bilgiKasesi[anahtar] = deger;
        }
    }
    return bilgiKasesi;
}

function formNeticesiniBildir(haberMetni, haberTuru) { // success, danger, warning, info
    const haberPanosu = document.getElementById('formSubmissionMessage');
    if (haberPanosu) {
        haberPanosu.innerHTML = `
            <div class="alert alert-${haberTuru} alert-dismissible fade show" role="alert">
                ${haberMetni}
                <button type="button" class="close" data-dismiss="alert" aria-label="Kapat">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
        // jQuery ile slideDown efekti
        $(haberPanosu).hide().slideDown();
        console.log(`Form neticesi bildirildi: ${haberMetni} (tür: ${haberTuru})`);
    }
}

function muracaatFormunuTemizle() {
    const basvuruFormu = document.getElementById('contactForm');
    if (basvuruFormu) {
        basvuruFormu.reset();
        // Geçerlilik işaretlerini temizle
        basvuruFormu.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });
        basvuruFormu.querySelectorAll('.invalid-feedback').forEach(el => {
            el.style.display = 'none';
        });
        const dosyaHataYeri = document.getElementById('fileError');
        if (dosyaHataYeri) dosyaHataYeri.textContent = '';

        // Karakter sayacını ve memnuniyet göstergesini sıfırla/başlangıca al
        if (document.getElementById('textareaMessage') && document.getElementById('charCountDisplay')) {
            harfAdediniGuncelle('textareaMessage', 'charCountDisplay');
        }
        const satisfactionInput = document.getElementById('inputSatisfaction');
        const satisfactionValueDisplay = document.getElementById('satisfactionValue');
        if (satisfactionInput && satisfactionValueDisplay) {
            satisfactionInput.value = "70"; // Varsayılan değere döndür
            satisfactionValueDisplay.textContent = satisfactionInput.value;
        }
        
        $('#formSubmissionMessage').slideUp(function() { $(this).empty(); });
        formDegisikligiYapildi = false; // Form temizlendiği için bayrağı sıfırla
        console.log('Müracaat formu temizlendi.');
    }
}
// HTML'den çağrılan resetContactFormVisuals için takma ad
function resetContactFormVisuals() {
    muracaatFormunuTemizle();
}

function palettenRastgeleTonSec() {
    const renkHarfleri = '0123456789ABCDEF';
    let secilenTon = '#';
    for (let i = 0; i < 6; i++) {
        secilenTon += renkHarfleri[Math.floor(Math.random() * 16)];
    }
    return secilenTon;
}

function nesneyeRastgeleRenkKat(nesneKimligi, ozellik = 'color') {
    const hedeflenenNesne = document.getElementById(nesneKimligi);
    if (hedeflenenNesne) {
        hedeflenenNesne.style[ozellik] = palettenRastgeleTonSec();
        console.log(`"${nesneKimligi}" nesnesinin "${ozellik}" özelliği rastgele bir renkle boyandı.`);
    }
}

function cihazinKimliğiniKaydet() {
    console.groupCollapsed("Cihazın Kimlik Bilgileri");
    console.log("Kullanıcı Aracısı:", navigator.userAgent);
    console.log("Platform:", navigator.platform);
    console.log("Lisan:", navigator.language);
    console.log("Çerezler Faal mi?:", navigator.cookieEnabled);
    console.log("Ekran Ebadı:", `${window.screen.width}x${window.screen.height}`);
    console.log("Görünüm Alanı Ebadı:", `${window.innerWidth}x${window.innerHeight}`);
    console.groupEnd();
}

function ayrilmadanEvvelOnayIste(formElementi) {
    if (formElementi) {
        formElementi.addEventListener('input', function() {
            formDegisikligiYapildi = true;
            console.log("Formda değişiklik yapıldı.");
        });
        // Submit ve reset butonları için de formDegisikligiYapildi'yi yönet
    }
    window.onbeforeunload = function() {
        if (formDegisikligiYapildi) {
            return "Yaptığınız değişiklikler henüz kaydedilmedi. Bu sayfadan ayrılmak istediğinize emin misiniz?";
        }
    };
    console.log("Sayfadan ayrılma onayı devrede.");
}


function genelHaberFisilda(haberMetni, haberTuru = 'info') { // info, error, warn
    const zamanMührü = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit'});
    const mesaj = `[${zamanMührü}] ${haberMetni}`;
    switch (haberTuru) {
        case 'error': console.error(mesaj); break;
        case 'warn': console.warn(mesaj); break;
        default: console.info(mesaj);
    }
}
// HTML'den çağrılan logUserClick için tanımlama
function logUserClick(message) {
    genelHaberFisilda(`Kullanıcı aksiyonu: ${message}`, 'info');
    etkilesimAdedi++;
    console.log(`Toplam etkileşim (logUserClick ile): ${etkilesimAdedi}`);
}
// HTML'den çağrılan logGenericMessage için tanımlama
function logGenericMessage(message) {
    genelHaberFisilda(message, 'info');
}


function yolculukIlerlemesiniGoster() {
    const yukariKaymaMiktari = window.pageYOffset || document.documentElement.scrollTop;
    const toplamYolUzunlugu = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                           document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight;
    const gidilenYolYuzdesi = (toplamYolUzunlugu > 0) ? (yukariKaymaMiktari / toplamYolUzunlugu) * 100 : 0;
    ilerlemeSeridiniGuncelle('pageProgress', gidilenYolYuzdesi);
}

function ilerlemeSeridiniGuncelle(seritKimligi, yuzdeDegeri) {
    const seritOgesi = document.getElementById(seritKimligi);
    if (seritOgesi) {
        const duzeltilmisYuzde = Math.max(0, Math.min(100, yuzdeDegeri)); // 0-100 arasına sıkıştır
        seritOgesi.style.width = duzeltilmisYuzde + '%';
        seritOgesi.setAttribute('aria-valuenow', duzeltilmisYuzde);
    }
}

function zirveyeIsinla() {
    // jQuery bağımlılığını kaldırıp saf JS ile yapalım
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    console.log("Zirveye ışınlanıldı (Smooth scroll).");
}


function dosyaAgirliginiTart(dosyaGirdisi, sessizMod = false) {
    const dosyaHataBildirimiYeri = document.getElementById('fileError'); // Bu ID iletisim.html'de var
    if (!dosyaGirdisi || !dosyaGirdisi.files || dosyaGirdisi.files.length === 0) {
        if (dosyaHataBildirimiYeri) dosyaHataBildirimiYeri.textContent = '';
        return true; // Dosya seçilmedi, problem yok (eğer zorunlu değilse)
    }
    const incelenenDosya = dosyaGirdisi.files[0];
    const dosyaBoyutuMB = incelenenDosya.size / 1024 / 1024;
    const izinVerilenAzamiBoyut = 2; 

    if (dosyaBoyutuMB > izinVerilenAzamiBoyut) {
        const hataMesaji = `Dosya çok ağır (${dosyaBoyutuMB.toFixed(2)} MB). İzin verilen en fazla ağırlık ${izinVerilenAzamiBoyut} MB.`;
        if (!sessizMod && dosyaHataBildirimiYeri) {
            dosyaHataBildirimiYeri.textContent = hataMesaji;
        }
        alaniHataliIsaretle(dosyaGirdisi, hataMesaji); // Form genel kontrolü için
        return false;
    } else {
        if (!sessizMod && dosyaHataBildirimiYeri) dosyaHataBildirimiYeri.textContent = '';
        alaniDogruIsaretle(dosyaGirdisi);
        return true;
    }
}
// HTML'den çağrılan validateFileSize için takma ad
function validateFileSize(fileInputElement) {
    return dosyaAgirliginiTart(fileInputElement);
}

function ipucuFisildayicilariniEtkinlestir() {
    // Bootstrap 4'te tooltip'ler jQuery gerektirir.
    $('[data-toggle="tooltip"]').tooltip();
    console.log("İpucu fısıldayıcıları (tooltip) etkinleştirildi.");
}

function gununTarihiniYazdir() { // Bu fonksiyon bir yerde kullanılmıyor gibi, ama tanımı var.
    return new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function zamaninAkisiniGoster() {
    const simdi = new Date();
    const tarihSecenekleri = { year: 'numeric', month: 'long', day: 'numeric' };
    const saatSecenekleri = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const bicimliTarih = simdi.toLocaleDateString('tr-TR', tarihSecenekleri);
    const bicimliSaat = simdi.toLocaleTimeString('tr-TR', saatSecenekleri);
    const zamanAkisiMetni = `${bicimliTarih}, ${bicimliSaat}`;
    const gostergeAlani = document.getElementById('dateTimeDisplay'); // index.html'de var
    if (gostergeAlani) {
        gostergeAlani.textContent = zamanAkisiMetni;
    }
}

function kaydirincaSeyirDefteriAnimasyonu() {
    const seyirDefteri = document.getElementById('mainNav');
    if (seyirDefteri) {
        const baslangicYuksekligi = seyirDefteri.offsetTop; 
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) { 
                seyirDefteri.classList.add('navbar-scrolled');
            } else {
                seyirDefteri.classList.remove('navbar-scrolled');
            }
        });
        console.log('Seyir defteri (navbar) scroll animasyonu ayarlandı.');
    }
}


function kelimeleriHeybetlendir(ifade) {
    if(typeof ifade !== 'string') return '';
    return ifade.toUpperCase();
}
function kelimeleriTevazuyaErdir(ifade) {
     if(typeof ifade !== 'string') return '';
    return ifade.toLowerCase();
}
function kaderCarkindanSayiCek(enAz, enCok) {
    return Math.floor(Math.random() * (enCok - enAz + 1)) + enAz;
}
function metniHafizayaTilsimla(metinParcasi) {
    navigator.clipboard.writeText(metinParcasi).then(function() {
        genelHaberFisilda('Metin başarıyla panoya kopyalandı!', 'success');
    }, function(hata) {
        genelHaberFisilda('Metin panoya kopyalanamadı: ' + hata, 'error');
    });
}
function adresCubugundakiGizemleriCoz() {
    const params = new URLSearchParams(window.location.search);
    const cozulenGizemler = {};
    for (const [anahtar, deger] of params) {
        cozulenGizemler[anahtar] = deger;
    }
    console.log("Adres Çubuğundaki Parametreler:", cozulenGizemler);
    return cozulenGizemler;
}



document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM tamamen yüklendi ve ayrıştırıldı.');
    
   
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('mouseenter', function() { $(this).stop().animate({ letterSpacing: '1px' }, 200); });
        navbarBrand.addEventListener('mouseleave', function() { $(this).stop().animate({ letterSpacing: '0px' }, 200); });
    }

    const avatarImg = document.querySelector('img[alt="[Avatarınızın Resmi]"]');
    if (avatarImg) {
        avatarImg.title = 'Bu benim şahane suretim!';
        avatarImg.onload = function() { console.log('Avatar sureti yüklendi ve başlığı eklendi.'); };
    }

    const footerThemeLink = document.querySelector('.footer a[onclick="gorunumuTazele()"]');
    if(footerThemeLink){
        footerThemeLink.addEventListener('mouseenter', function() { this.classList.add('text-warning','shadow-sm');});
        footerThemeLink.addEventListener('mouseleave', function() { this.classList.remove('text-warning','shadow-sm');});
    }
});