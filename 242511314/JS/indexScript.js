function changeDND(urlDND) {
    document.getElementById("iframeTheOne").src = urlDND;
}

function changeSkyrimTR(urlSkyrim) {
    document.getElementById("iframeTheOne").src = urlSkyrim;
}

document.addEventListener('mousemove', function(nokta) 
{
    document.getElementById('kordinat').textContent = 'X:\n' + nokta.clientX + '\nY:\n' + nokta.clientY;
});

function yukarıZıpla() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function asagıGit() {
    window.scrollBy(0,659);
}

/* Saat fonksiyonu burada başlıyor... */


var gelecekZaman = new Date("2025-08-30T12:00:00").getTime();

var bildirimDurduran = setInterval(function () {

    var simdikiZaman = new Date().getTime();
    var kalanZaman = gelecekZaman - simdikiZaman;

    var kalanGun = Math.floor(kalanZaman / (1000 * 60 * 60 * 24));
    var kalanSaat = Math.floor((kalanZaman % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
    var kalanDakika = Math.floor((kalanZaman % (1000 * 60 * 60)) / (1000 * 60));
    var kalanSaniye = Math.floor((kalanZaman % (1000 * 60)) / (1000));

    document.getElementById("indexTimer").innerHTML = kalanGun + "g " + kalanSaat + "s " + kalanDakika + "d " + kalanSaniye + "sn ";

    if (kalanZaman<0) {
        clearInterval(bildirimDurduran);
        document.getElementById("indexTimer").innerHTML = "Daha fazlası için beklemede kalın!"
        alert("Yeni içerik yayında! İlk okuyanlardan ol!");
    }

},1000);

/* Saat fonksiyonu burada bitiyor... */

function getirSaat() {
    document.getElementById("indexTimerContainer").style.display = "flex";
    document.getElementById("indexImage").style.display = "none";

}

function goturSaat() {
    document.getElementById("indexTimerContainer").style.display = "none";
    document.getElementById("indexImage").style.display = "flex";
}