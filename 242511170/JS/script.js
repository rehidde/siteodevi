$(document).ready(function () {
    $('#iletisimForm').on('submit', function (e) {
        e.preventDefault();
        let ad = $('#ad').val().trim();
        let email = $('#email').val().trim();
        let mesaj = $('#mesaj').val().trim();
        let isValid = true;

        // Temizle
        $('.form-control').removeClass('is-invalid');

        if (ad === '') {
            $('#ad').addClass('is-invalid');
            isValid = false;
        }
        if (!validateEmail(email)) {
            $('#email').addClass('is-invalid');
            isValid = false;
        }
        if (mesaj === '') {
            $('#mesaj').addClass('is-invalid');
            isValid = false;
        }

        if (isValid) {
            $('#formSonuc').html(`<div class="alert alert-success">Mesajınız gönderildi!</div>`);
            $('#iletisimForm')[0].reset();
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
