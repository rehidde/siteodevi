function renklendir() {
document.body.style.color="green";
}
$(document).ready(function(){
  $("p").hover(function(){
    $(this).css("color", "green");
  });
});


function gizle() {
  $("p").hide();
}
function goster() {
  $("p").show();
}
function yaziyiBuyut() {
  $("p").css("font-size", "22px");
}
function yaziyiKucult() {
  $("p").css("font-size", "14px");
}
function renkDegistir() {
  $("body").css("background-color", "lightblue");
}
function geriAlRenk() {
  $("body").css("background-color", "");
}
function kenarlikEkle() {
  $("img").css("border", "3px solid red");
}
function seffafYap() {
  $("img").css("opacity", "0.5");
}
function seffafGeri() {
  $("img").css("opacity", "1");
}
