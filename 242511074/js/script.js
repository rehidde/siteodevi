// Car Details Function
function showDetails(carModel) {
    const carDetails = {
        mercedes: {
            name: 'Mercedes-Benz S-Class',
            price: '₺12.500.000',
            features: ['Panoramik Cam Tavan', 'Burmester Ses Sistemi', 'Masaüstü Bilgisayar']
        },
        bmw: {
            name: 'BMW 7 Series',
            price: '₺11.800.000',
            features: ['Sky Lounge', 'Bowers & Wilkins Ses Sistemi', 'Gesture Control']
        },
        audi: {
            name: 'Audi A8',
            price: '₺11.900.000',
            features: ['Matrix LED Farlar', 'Bang & Olufsen Ses Sistemi', 'Virtual Cockpit']
        }
    };

    const car = carDetails[carModel];
    alert(`${car.name}\nFiyat: ${car.price}\nÖzellikler:\n${car.features.join('\n')}`);
}

// Form Validation Function
function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return true;

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!isValidEmail(email)) {
        alert('Lütfen geçerli bir e-posta adresi giriniz.');
        return false;
    }

    if (!isValidPhone(phone)) {
        alert('Lütfen geçerli bir telefon numarası giriniz.');
        return false;
    }

    if (message.length < 10) {
        alert('Mesajınız en az 10 karakter olmalıdır.');
        return false;
    }

    return true;
}

// Email Validation Function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation Function
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Budget Range Update Function
function updateBudgetValue() {
    const budgetInput = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    if (budgetInput && budgetValue) {
        // Değeri al ve sayıya çevir
        const value = parseInt(budgetInput.value);
        
        // Türk Lirası formatında göster
        const formattedValue = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
        
        budgetValue.textContent = formattedValue;
    }
}

// Smooth Scroll Function
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Image Gallery Function
function createImageGallery() {
    const gallery = document.querySelector('.car-gallery');
    if (!gallery) return;

    const images = gallery.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button onclick="this.parentElement.parentElement.remove()">Kapat</button>
                </div>
            `;
            document.body.appendChild(modal);
        });
    });
}

// Car Filter Function
function filterCars(criteria) {
    const cars = document.querySelectorAll('.car-card');
    cars.forEach(car => {
        const price = parseInt(car.dataset.price);
        const brand = car.dataset.brand;
        
        if (criteria.brand && brand !== criteria.brand) {
            car.style.display = 'none';
        } else if (criteria.minPrice && price < criteria.minPrice) {
            car.style.display = 'none';
        } else if (criteria.maxPrice && price > criteria.maxPrice) {
            car.style.display = 'none';
        } else {
            car.style.display = 'block';
        }
    });
}

// Test Drive Scheduler Function
function scheduleTestDrive() {
    const dateInput = document.getElementById('testDrive');
    if (!dateInput) return;

    const selectedDate = new Date(dateInput.value);
    const now = new Date();

    if (selectedDate < now) {
        alert('Lütfen gelecek bir tarih seçiniz.');
        return false;
    }

    // Simulate API call
    alert('Test sürüşü başarıyla planlandı!');
    return true;
}

// Newsletter Subscription Function
function subscribeNewsletter(email) {
    if (!isValidEmail(email)) {
        alert('Lütfen geçerli bir e-posta adresi giriniz.');
        return false;
    }

    // Simulate API call
    alert('Bülten aboneliğiniz başarıyla gerçekleşti!');
    return true;
}

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize budget range
    const budgetInput = document.getElementById('budget');
    if (budgetInput) {
        // Input değiştiğinde değeri güncelle
        budgetInput.addEventListener('input', updateBudgetValue);
        // Sayfa yüklendiğinde başlangıç değerini ayarla
        updateBudgetValue();
    }

    // Initialize image gallery
    createImageGallery();

    // Add smooth scroll to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
}); 