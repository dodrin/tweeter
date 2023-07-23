// Jquery animation to toggle up and down tweet form
$(document).ready(() => {
  // Cache selectors
  const $newTweet = $(".new-tweet");
  const $newTweetTextArea = $newTweet.find("textarea");

  // Initially hide the tweet form
  $newTweet.hide();

  // Set up click handler for the nav button
  $(".nav-right").click(() => {
    // Toggle the visibility of the tweet form
    $newTweet.slideToggle("slow", () => {
      // SEt focus to the textarea inside the tweet form
      // after the slideToggle animation completes
      $newTweetTextArea.focus();
    });
  });
});
