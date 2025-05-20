function toggleDescription(id) {
    const desc = document.getElementById(id);
    desc.style.display = desc.style.display === "block" ? "none" : "block";
}

// Bu fonksiyon sadece index.html'de kalacak
function refreshHome() {
    // Bu fonksiyon iletisim.html'den çağrıldığında ana sayfaya yönlendirme yapabilir
    if (window.location.pathname.includes('iletisim.html')) {
        window.location.href = 'index.html';
    } else {
        // Zaten ana sayfadaysa, sadece detayları gizle
        const descriptions = document.querySelectorAll('.skin-description');
        descriptions.forEach(desc => {
            desc.style.display = 'none';
        });
    }
}

// Bu fonksiyon iletisim.html'de kullanılacağı için kaldırıldı
// function showSignup() {
//     document.getElementById("main-content").style.display = "none";
//     document.getElementById("signup-section").style.display = "block";
// }

function submitForm() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const steamUrl = document.getElementById("steam-url").value;
    const favoriteGame = document.getElementById("favorite-game").value;
    const username = document.getElementById("username").value;
    const birthdate = document.getElementById("birthdate").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;

    if (firstName && lastName && email && phone && steamUrl && favoriteGame && username && birthdate && password && gender) {
        // Bilgileri konsola yazdır
        console.log(`Kayıt Bilgileri: Ad: ${firstName}, Soyad: ${lastName}, E-posta: ${email}, Telefon: ${phone}, Steam URL: ${steamUrl}, Favori Oyunu: ${favoriteGame}, Kullanıcı Adı: ${username}, Doğum Tarihi: ${birthdate}, Şifre: ${password}, Cinsiyet: ${gender}`);
        alert("Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz.");
        // Kayıt başarılı olduğunda ana sayfaya yönlendir
        window.location.href = 'index.html';
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
}

// Gereksiz veya kullanılmayan fonksiyonlar kaldırıldı
// function changeColor(element, color) { element.style.backgroundColor = color; }
// function changeText(element, text) { element.innerText = text; }
// function toggleVisibility(element) { element.style.display = element.style.display === "none" ? "block" : "none"; }
// function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
// function countButtons() { return document.querySelectorAll(".btn").length; }
function getCurrentDate() { return new Date().toLocaleDateString(); }
function logMessage(message) { console.log(message); }
// function getElementHeight(element) { return element.offsetHeight; }
// function getElementWidth(element) { return element.offsetWidth; }

logMessage("Sayfa Yüklendi: " + getCurrentDate());