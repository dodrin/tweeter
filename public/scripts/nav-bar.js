//Jquery animation to toggle up and down tweet form
$(document).ready(() => {
  $(".new-tweet").css("display", "none");

  $(".nav-right").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
});
