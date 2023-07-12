$("#tweet-text").keyup(function () {
  const charCount = $(this).val().length;
  const maxLength = 140;
  const counter = $(".counter");

  counter.text(maxLength - charCount);

  if (charCount > maxLength) {
    counter.css("color", "red");
  } else {
    counter.css("color", "#545149");
  }
});
