// 10 farklı JavaScript fonksiyonu

// 1. Sayfa yüklendiğinde çalışacak fonksiyon
window.onload = function() {
    console.log("Sayfa yüklendi");
    updateBudgetValue();
};

// 2. Villa detaylarını gösteren fonksiyon
function showDetails(villaId) {
    alert(`Villa ${villaId} detayları gösteriliyor...`);
    // Burada modal açılabilir veya detay sayfasına yönlendirme yapılabilir
}

// 3. Villaları listeleme fonksiyonu
function showVillas() {
    document.querySelector('.featured-villas').scrollIntoView({
        behavior: 'smooth'
    });
}

// 4. İletişim bölümüne kaydırma fonksiyonu
function scrollToContact() {
    if (window.location.pathname.includes('contact.html')) {
        return;
    }
    window.location.href = 'contact.html';
}

// 5. Kart üzerine gelindiğinde zoom efekti
function zoomCard(element) {
    element.style.transform = 'scale(1.05)';
    element.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
}

// 6. Kart üzerinden çıkıldığında zoom efekti kaldırma
function unzoomCard(element) {
    element.style.transform = 'scale(1)';
    element.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
}

// 7. Sosyal medya bağlantılarını açma
function openSocial(platform) {
    let url;
    switch(platform) {
        case 'fb':
            url = 'https://facebook.com/premiumvillas';
            break;
        case 'ig':
            url = 'https://instagram.com/premiumvillas';
            break;
        case 'tw':
            url = 'https://twitter.com/premiumvillas';
            break;
        default:
            url = '#';
    }
    window.open(url, '_blank');
}

// 8. Bütçe değerini güncelleme
function updateBudgetValue() {
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetSlider && budgetValue) {
        budgetValue.textContent = '$' + Number(budgetSlider.value).toLocaleString();
        
        budgetSlider.addEventListener('input', function() {
            budgetValue.textContent = '$' + Number(this.value).toLocaleString();
        });
    }
}

// 9. Form gönderme işlemi
function submitForm(event) {
    event.preventDefault();
    
    // Form verilerini topla
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        villaInterest: document.getElementById('villaInterest').value,
        budget: document.getElementById('budget').value,
        visitDate: document.getElementById('visitDate').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    console.log('Form gönderildi:', formData);
    
    // Burada AJAX ile sunucuya gönderme yapılabilir
    alert('Formunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
    document.getElementById('contactForm').reset();
}

// 10. Sayfa scroll pozisyonuna göre navbar rengini değiştirme
/*window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-container');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});*/

// Karanlık Mod Fonksiyonu
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton(isDarkMode);
}

// Buton Görünümünü Güncelle
function updateDarkModeButton(isDarkMode) {
    const button = document.getElementById('darkModeToggle');
    if (isDarkMode) {
        button.style.backgroundColor = '#f5f5f5';
        button.style.color = '#333';
    } else {
        button.style.backgroundColor = '#333';
        button.style.color = '#f5f5f5';
    }
}

// Sayfa Yüklendiğinde Kontrol Et
function checkDarkModePreference() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedPreference = localStorage.getItem('darkMode');
    
    if (storedPreference === 'true' || (storedPreference === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateDarkModeButton(true);
    }
}

// Sistem teması değiştiğinde dinle
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('darkMode') === null) {
        toggleDarkMode();
    }
});

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', checkDarkModePreference);

// Buton event listener'ı
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
const villas = {
    1: {
        title: "Bodrum Beauty Villa",
        price: "$1,250,000",
        location: "Bodrum, Muğla",
        size: "450 m²",
        features: [
            "5 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa1/1.jpg",
            "images/villa1/2.jpg",
            "images/villa1/3.jpg",
            "images/villa1/4.jpg",
            "images/villa1/5.jpg",
            "images/villa1/6.jpg",
            
        ]
    },

    2: {
        title: "Çeşme Hillside Villa",
        price: "$950,000",
        location: "İzmir,Çeşme",
        size: "380 m²",
        features: [
            "4 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
            
        ],
        images: [
            "images/villa2/1.jpg",
            "images/villa2/2.jpg",
            "images/villa2/3.jpg",
            "images/villa2/4.jpg",
            "images/villa2/5.jpg",
            "images/villa2/6.jpg",
           
            
            
        ]
    },

    3: {
        title: "Side Golf Resort",
        price: "$1,500,000",
        location: "Side, Antalya",
        size: "520 m²",
        features: [
            "6 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa3/1.jpg",
            "images/villa3/2.jpg",
            "images/villa3/3.jpg",
            "images/villa3/4.jpg",
            "images/villa3/5.jpg",
            "images/villa3/6.jpg",
           
            
            
            
        ]
    },

    4: {
        title: "Fethiye Heaven Villa",
        price: "$1,000,000",
        location: "Fethiye, Muğla",
        size: "370 m²",
        features: [
            "4 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa4/1.jpg",
            "images/villa4/2.jpg",
            "images/villa4/3.jpg",
            "images/villa4/4.jpg",
            "images/villa4/5.jpg",
            "images/villa4/6.jpg",
           
            
            
            
        ]
    },

    5: {
        title: "Marmaris Ege Villa",
        price: "$850,000",
        location: "Marmaris, Muğla",
        size: "370 m²",
        features: [
            "3 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa5/1.jpg",
            "images/villa5/2.jpg",
            "images/villa5/3.jpg",
            "images/villa5/4.jpg",
            "images/villa5/5.jpg",
            "images/villa5/6.jpg",
           
            
            
            
        ]
    },

    6: {
        title: "Milas Altunsoy Villa",
        price: "$1,050,000",
        location: "Milas, Muğla",
        size: "390 m²",
        features: [
            "3 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa6/1.jpg",
            "images/villa6/2.jpg",
            "images/villa6/3.jpg",
            "images/villa6/4.jpg",
            "images/villa6/5.jpg",
            "images/villa6/6.jpg",
            
            
            
        ]
    },

    7: {
        title: "Datça Kasımpatı Villa",
        price: "$600,000",
        location: "Datça, Aydın",
        size: "170 m²",
        features: [
            "1 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa7/1.jpg",
            "images/villa7/2.jpg",
            "images/villa7/3.jpg",
            "images/villa7/4.jpg",
            "images/villa7/5.jpg",
            "images/villa7/6.jpg",
            
            
            
            
        ]
    },

    8: {
        title: "Didim Gizmo Villa",
        price: "$1,100,000",
        location: "Didim, Aydın",
        size: "390 m²",
        features: [
            "4 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa8/1.jpg",
            "images/villa8/2.jpg",
            "images/villa8/3.jpg",
            "images/villa8/4.jpg",
            "images/villa8/5.jpg",
            "images/villa8/6.jpg",
            
            
            
        ]
    },

    9: {
        title: "Bodrum Waterfront Villa",
        price: "$1,250,000",
        location: "Bodrum, Muğla",
        size: "450 m²",
        features: [
            "5 Yatak Odası",
            "Özel Havuz",
            "Deniz Manzarası",
            "Smart Home Sistem",
            "Bahçeli"
        ],
        images: [
            "images/villa9/1.jpg",
            "images/villa9/2.jpg",
            "images/villa9/3.jpg",
            "images/villa9/4.jpg",
            "images/villa9/5.jpg",
            "images/villa9/6.jpg",
        
            
            
            
        ]
    },

};

// Modal fonksiyonları
function showDetails(villaId) {
    const villa = villas[villaId];
    if (!villa) return;
    
    const modal = document.getElementById('villaModal');
    document.getElementById('modalTitle').textContent = villa.title;
    document.getElementById('modalPrice').textContent = villa.price;
    document.getElementById('modalLocation').textContent = villa.location;
    document.getElementById('modalSize').textContent = villa.size;
    
    // Özellik listesi
    const featureList = document.getElementById('featureList');
    featureList.innerHTML = '';
    villa.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featureList.appendChild(li);
    });
    
    // Resim galerisi
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelector('.thumbnails');
    mainImage.src = villa.images[0];
    thumbnails.innerHTML = '';
    
    villa.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.onclick = () => mainImage.src = img;
        thumbnails.appendChild(thumb);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı engelle
}

function closeModal() {
    document.getElementById('villaModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openContactForm() {
    closeModal();
    // İletişim formuna yönlendirme yapabilirsiniz
    window.location.href = 'contact.html';
}

// Dışarı tıklayarak kapatma
window.onclick = function(event) {
    const modal = document.getElementById('villaModal');
    if (event.target == modal) {
        closeModal();
    }
}