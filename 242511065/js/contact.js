// Form İşlemleri
function submitForm(event) {
    event.preventDefault();
    if (validateForm()) {
        alert('Formunuz başarıyla gönderildi!');
        saveFormData();
        document.getElementById('contactForm').reset();
    }
}

function validateForm() {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        alert('Geçerli bir email adresi giriniz.');
        return false;
    }
    return true;
}

// LocalStorage İşlemleri
function saveFormData() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    localStorage.setItem('lastContactForm', JSON.stringify(formData));
}

// jQuery Efektleri
$(document).ready(function() {
    // Input Efektleri
    $('input, textarea, select').focus(function() {
        $(this).css('background-color', '#fff8e1');
    }).blur(function() {
        $(this).css('background-color', 'white');
    });
    
    // Renk Seçici
    $('#favColor').change(function() {
        $('.contact-form').css('border-top', `3px solid ${$(this).val()}`);
    });
});