      // Jquery kodlari
      
      
$(document).ready(function() {
  $("#btnGizle").click(function() {
    $("#contactForm").slideUp();
  });

  $("#btnGoster").click(function() {
    $("#contactForm").slideDown();
  });

  $("button").mouseover(function() {
    $(this).css("opacity", "0.8");
  });

  $("input").focus(function() {
    $(this).css("border-color", "#ff0000");
  });

  $("#contactForm").submit(function(e) {
    e.preventDefault();
    alert("Form başarıyla gönderildi!");
  });
});