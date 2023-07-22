// Page scroll-up button to appear when its scroll down
// as scroll dwon write a new tweet button will desappear
$(document).ready(() => {
  $(window).scroll(() => {
    if ($(this).scrollTop() > 100) {
      $("#toggle-up").fadeIn();
      $(".nav-right").fadeOut();
    } else {
      $(".nav-right").fadeIn();
      $("#toggle-up").fadeOut();
    }
  });

  //Scroll-top button
  $("#toggle-up").click(() => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
    return false;
  });
});
c