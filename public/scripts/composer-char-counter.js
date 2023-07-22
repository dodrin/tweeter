//display the length of characters in tweet-text textarea
$("#tweet-text").keyup(function () {
  const charCount = $(this).val().length;
  const maxLength = 140;
  const counter = $(".counter");

  counter.text(maxLength - charCount);

  if (charCount > maxLength) {
    return counter.css("color", "red");
  }
  return counter.css("color", "#545149");
});
