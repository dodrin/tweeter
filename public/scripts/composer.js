// Page scroll-up button to appear when its scroll down
// as scroll dwon write a new tweet button will desappear
$(document).ready(() => {
  // caching jQuery selectors
  const $toggleUp = $("#toggle-up");
  const $navRight = $(".nav-right");

  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $toggleUp.fadeIn();
      $navRight.fadeOut();
    } else {
      $navRight.fadeIn();
      $toggleUp.fadeOut();
    }
  });

  // scroll-top button
  $toggleUp.click(() => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
    return false;
  });
});