// Main JavaScript functions

// Form validation
function validateForm() {
    let isValid = true;

    // Form alanlarını al
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const newsletter = document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false;

    // Basit doğrulama kontrolleri
    if (firstName.trim() === '') {
        isValid = false;
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen adınızı giriniz.',
            icon: 'error',
            confirmButtonText: 'Tamam'
        });
        return false;
    }

    if (lastName.trim() === '') {
        isValid = false;
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen soyadınızı giriniz.',
            icon: 'error',
            confirmButtonText: 'Tamam'
        });
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen geçerli bir e-posta adresi giriniz.',
            icon: 'error',
            confirmButtonText: 'Tamam'
        });
        return false;
    }

    if (message.trim() === '') {
        isValid = false;
        Swal.fire({
            title: 'Hata!',
            text: 'Lütfen bir mesaj giriniz.',
            icon: 'error',
            confirmButtonText: 'Tamam'
        });
        return false;
    }

    if (isValid) {
        // Form verilerini JSON formatına dönüştür
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            subject: subject,
            message: message,
            newsletter: newsletter,
            date: new Date().toISOString()
        };

        // JSON verisini görüntüle/kaydet
        const jsonData = JSON.stringify(formData, null, 2);
        console.log(jsonData);

        // JSON dosyasını oluştur ve indir
        const filename = 'mesaj_' + new Date().getTime() + '.json';
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Local Storage'a da kaydet
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Dosyayı otomatik olarak indir
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Başarı mesajı göster
        Swal.fire({
            title: 'Başarılı!',
            text: 'Mesajınız başarıyla gönderildi.',
            icon: 'success',
            confirmButtonText: 'Tamam'
        });

        document.getElementById('contactForm').reset();
        return false;
    }

    return false;
}

// Team search function
function searchTeam() {
    const searchValue = document.getElementById('teamSearchInput').value.toLowerCase();
    alert('Arama sonuçları: ' + searchValue);
}

// News reading functions
function readMoreNews(newsId) {
    alert('Haber #' + newsId + ' detayları gösteriliyor.');
}

function loadMoreNews() {
    alert('Daha fazla haber yükleniyor...');
}

// Toggle active class for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Takım bilgileri
const teamData = {
    gs: {
        name: "Galatasaray",
        founded: "1905",
        nickname: "Cimbom",
        championships: 23,
        cup: 18,
        supercup: 16,
        uefacup: 1,
        uefasupercup: 1,
        logo: "img/teams/galatasaray.gif",
        overview: `
            <h4 class="text-primary mb-3">Kulüp Tarihi</h4>
            <p>Galatasaray, 1905 yılında kurulmuş Türkiye'nin en başarılı spor kulüplerinden biridir. Sarı-kırmızı renklerle özdeşleşen kulüp, ulusal ve uluslararası arenada sayısız başarıya imza atmıştır.</p>
            <p>Galatasaray, Türkiye'nin ilk UEFA kupasını kazanan takımı olarak tarihe geçmiştir. 2000 yılında UEFA Kupası'nı kazanarak Türk futbol tarihinde bir dönüm noktası oluşturmuştur.</p>

            <h4 class="text-primary mt-4 mb-3">Başarılar</h4>
            <p>Kulüp, 23 Süper Lig şampiyonluğu, 18 Türkiye Kupası, 16 Süper Kupa, 1 UEFA Kupası ve 1 UEFA Süper Kupası ile Türkiye'nin en çok kupa kazanan kulübü unvanına sahiptir.</p>

            <h4 class="text-primary mt-4 mb-3">Güncel Durum</h4>
            <p>2024-2025 sezonu itibariyle Okan Buruk yönetiminde başarılı bir performans sergileyen takım, hem ligde hem de Avrupa kupalarında mücadelesini sürdürmektedir.</p>
        `
    },
    fb: {
        name: "Fenerbahçe",
        founded: "1907",
        nickname: "Sarı Kanaryalar",
        championships: 19,
        cup: 6,
        supercup: 9,
        uefacup: 0,
        uefasupercup: 0,
        logo: "img/teams/fenerbahce.gif",
        overview: `
            <h4 class="text-primary mb-3">Kulüp Tarihi</h4>
            <p>Fenerbahçe, 1907 yılında kurulmuş Türkiye'nin en köklü spor kulüplerinden biridir. Sarı-lacivert renklerle özdeşleşen kulüp, ulusal ve uluslararası arenada birçok başarıya imza atmıştır.</p>
            <p>Fenerbahçe, Türkiye'nin ilk profesyonel spor kulüplerinden biri olarak tanınır ve birçok branşta faaliyet göstermektedir.</p>

            <h4 class="text-primary mt-4 mb-3">Başarılar</h4>
            <p>Kulüp, 19 Süper Lig şampiyonluğu, 6 Türkiye Kupası ve 9 Süper Kupa ile Türkiye'nin en başarılı kulüplerinden biridir.</p>

            <h4 class="text-primary mt-4 mb-3">Güncel Durum</h4>
            <p>2024-2025 sezonu itibariyle İsmail Kartal yönetiminde başarılı bir performans sergileyen takım, hem ligde hem de Avrupa kupalarında mücadelesini sürdürmektedir.</p>
        `
    },
    bjk: {
        name: "Beşiktaş",
        founded: "1903",
        nickname: "Kara Kartallar",
        championships: 16,
        cup: 10,
        supercup: 8,
        uefacup: 0,
        uefasupercup: 0,
        logo: "img/teams/besiktas.gif",
        overview: `
            <h4 class="text-primary mb-3">Kulüp Tarihi</h4>
            <p>Beşiktaş, 1903 yılında kurulmuş Türkiye'nin en eski spor kulüplerinden biridir. Siyah-beyaz renklerle özdeşleşen kulüp, ulusal ve uluslararası arenada önemli başarılara imza atmıştır.</p>
            <p>Beşiktaş, Türkiye'nin ilk spor kulüplerinden biri olarak tarihteki yerini almıştır ve birçok branşta faaliyet göstermektedir.</p>

            <h4 class="text-primary mt-4 mb-3">Başarılar</h4>
            <p>Kulüp, 16 Süper Lig şampiyonluğu, 10 Türkiye Kupası ve 8 Süper Kupa ile Türkiye'nin en başarılı kulüplerinden biridir.</p>

            <h4 class="text-primary mt-4 mb-3">Güncel Durum</h4>
            <p>2024-2025 sezonu itibariyle Giovanni van Bronckhorst yönetiminde başarılı bir performans sergileyen takım, hem ligde hem de Avrupa kupalarında mücadelesini sürdürmektedir.</p>
        `
    },
    ts: {
        name: "Trabzonspor",
        founded: "1967",
        nickname: "Bordo Mavililer",
        championships: 7,
        cup: 9,
        supercup: 9,
        uefacup: 0,
        uefasupercup: 0,
        logo: "img/teams/ts.gif",
        overview: `
            <h4 class="text-primary mb-3">Kulüp Tarihi</h4>
            <p>Trabzonspor, 1967 yılında kurulmuş Türkiye'nin en başarılı Anadolu kulüplerinden biridir. Bordo-mavi renklerle özdeşleşen kulüp, ulusal ve uluslararası arenada önemli başarılara imza atmıştır.</p>
            <p>Trabzonspor, Anadolu'dan çıkıp şampiyon olan ilk kulüp olarak Türk futbol tarihinde önemli bir yer edinmiştir.</p>

            <h4 class="text-primary mt-4 mb-3">Başarılar</h4>
            <p>Kulüp, 7 Süper Lig şampiyonluğu, 9 Türkiye Kupası ve 9 Süper Kupa ile Türkiye'nin en başarılı Anadolu kulübü unvanına sahiptir.</p>

            <h4 class="text-primary mt-4 mb-3">Güncel Durum</h4>
            <p>2024-2025 sezonu itibariyle Abdullah Avcı yönetiminde mücadelesini sürdüren takım, hem ligde hem de Avrupa kupalarında boy göstermektedir.</p>
        `
    },
    bsk: {
        name: "Başakşehir",
        founded: "1990",
        nickname: "Turuncu-Lacivertliler",
        championships: 1,
        cup: 0,
        supercup: 0,
        uefacup: 0,
        uefasupercup: 0,
        logo: "img/teams/istanbulbasaksehir.gif",
        overview: `
            <h4 class="text-primary mb-3">Kulüp Tarihi</h4>
            <p>Başakşehir, 1990 yılında İstanbul Büyükşehir Belediyespor olarak kurulmuş, 2014 yılında ise ismini Medipol Başakşehir FK olarak değiştirmiştir. Turuncu-lacivert renklerle mücadele eden kulüp, son yıllarda Türk futbolunda önemli bir yer edinmiştir.</p>

            <h4 class="text-primary mt-4 mb-3">Başarılar</h4>
            <p>Kulüp, 2019-2020 sezonunda ilk Süper Lig şampiyonluğunu kazanarak tarihinde önemli bir başarıya imza atmıştır.</p>

            <h4 class="text-primary mt-4 mb-3">Güncel Durum</h4>
            <p>2024-2025 sezonu itibariyle Çağdaş Atan yönetiminde mücadelesini sürdüren takım, hem ligde hem de Avrupa kupalarında boy göstermektedir.</p>
        `
    }
};

// Takımlar sayfasında takım seçme işlevi
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa takimlar.html ise takım seçme işlevini etkinleştir
    if (window.location.href.includes('takimlar.html')) {
        const teamItems = document.querySelectorAll('.team-logo-item');
        teamItems.forEach(item => {
            item.addEventListener('click', function() {
                const teamCode = this.getAttribute('data-team');
                displayTeamInfo(teamCode);

                // Seçilen takımı vurgula
                teamItems.forEach(el => el.classList.remove('border-primary'));
                this.classList.add('border-primary');
            });
        });

        // Varsayılan olarak ilk takımı göster
        displayTeamInfo('gs');
        document.querySelector('.team-logo-item[data-team="gs"]').classList.add('border-primary');
    }
});

// Takım bilgilerini gösterme fonksiyonu
function displayTeamInfo(teamCode) {
    const team = teamData[teamCode];
    if (!team) return;

    // Takım bilgilerini güncelle
    document.querySelector('.team-details .team-logo img').src = team.logo;
    document.querySelector('.team-details .team-logo img').alt = team.name;
    document.querySelector('.team-details .team-name').textContent = team.name;
    document.querySelector('.team-details .team-founded').textContent = `Kuruluş: ${team.founded}`;
    document.querySelector('.team-details .team-nickname').textContent = team.nickname;

    // Kupaları güncelle
    const listItems = document.querySelectorAll('.team-details .list-group-item .fw-bold');
    listItems[0].textContent = team.championships;
    listItems[1].textContent = team.cup;
    listItems[2].textContent = team.supercup;
    listItems[3].textContent = team.uefacup;
    listItems[4].textContent = team.uefasupercup;

    // Genel bilgileri güncelle
    document.getElementById('overview').innerHTML = team.overview;
}