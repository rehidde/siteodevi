function spanNumbersScript() {
    document.getElementById("spanNumbersOutput").textContent = document.getElementById("iletisimHistory").value;
}

function iletisimTimeScript() {
    document.getElementById("iletisimTimeOutput").textContent = document.getElementById("iletisimTime").value;
}

function submitScript() {
    var timepoint = parseInt(iletisimHistory.value);
    var hardwarepoint = parseInt(iletisimTime.value);  
    var totalpoint = timepoint*hardwarepoint;
    if ( (timepoint && hardwarepoint)==0  ) {
        var mesaj = "Mesajınızı aldık, iyi günler dileriz.";
        alert(mesaj);
    }
    else {
        alert("Mesajınızı aldık, iyi günler dileriz. Bu arada..."+"\n\nSüre Puanı: " + timepoint + "\nCihaz Puanı: " + hardwarepoint + "\nToplam puan: " + totalpoint);
    }
}

function backIndexScript() {
    window.location.href="index.html";
}

function randomGame() {
    document.getElementById("gameWindow").style.display ="flex";
    const konum = document.getElementById("gameWindow");
    konum.style.position = "fixed";
    konum.style.top = "250px";
    konum.style.left = "475px";
    var rastgeleSayi = Math.floor(Math.random() * 10);
    var oyunlar = ["Skyrim","Baldur's Gate 3","Elden Ring","Red Dead Redemption 2","Doom Eternal","This War of Mine","Mount&BladeII : Bannerlord","Project Zomboid","Disco Elysium","SOMA","A Way Out"];
    document.getElementById("gameWindowContent").textContent = oyunlar[rastgeleSayi];
}

function closeWindow() {
    document.getElementById("gameWindow").style.display = "none";
}

function karakterSay() {
    var adet = document.getElementById("iletisimMesaj").value.length;
    document.getElementById("metinLength").innerText = adet;
}

