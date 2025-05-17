// DOM Tam Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Navbar Linklerine Aktif Sınıf Ekleme
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Kategori Kartlarına Tıklama Efekti
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('.card-title').textContent.toLowerCase();
            alert(`${category} kategorisi seçildi! Bu alan geliştirilecek.`);
        });
    });

    // İletişim Formu Validasyonu
    if (document.getElementById('contactForm')) {
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (!name || !email) {
                showAlert('Lütfen zorunlu alanları doldurunuz!', 'danger');
            } else {
                showAlert('Form başarıyla gönderildi!', 'success');
                this.reset();
            }
        });
    }

    // Sohbet Kutusu İşlevselliği
    if (document.getElementById('chatInput')) {
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Temel Yardımcı Fonksiyonlar
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} mt-3`;
    alertDiv.textContent = message;
    document.querySelector('main').prepend(alertDiv);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (chatInput.value.trim()) {
        chatMessages.innerHTML += `
            <div class="message">
                <span class="message-user">Siz:</span>
                <span class="message-text">${chatInput.value}</span>
            </div>`;
        chatInput.value = '';
        
        // Otomatik cevap (3 saniye sonra)
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message">
                    <span class="message-user">Admin:</span>
                    <span class="message-text">Mesajınız alındı, teşekkür ederiz!</span>
                </div>`;
        }, 3000);
    }
}
