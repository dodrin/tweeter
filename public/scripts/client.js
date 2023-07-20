/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  //Fucntion to re-encode text to prevenx XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Loop through the database and show tweets
  const renderTweets = function (tweets) {
    $(".new-tweet__error").css("display", "none");
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  //
  const createTweetElement = function (tweet) {
    const article = $("<section>");
    const daysAgo = jQuery.timeago(tweet.created_at);
    const safeHTML = escape(tweet.content.text);

    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user">
          <img src="https://i.imgur.com/73hZDYK.png" alt="face-icon"/>
          <div class="user-name">${tweet.user.name}</div>
        </div>
        <div class="user-id">${tweet.user.handle}</div>
      </header>
      <p>${safeHTML}</p>
      <footer>
        <span class="timestamp">${daysAgo}</span>
        <div>
          <i class="icon fa-solid fa-flag"></i>
          <i class="icon fa-solid fa-retweet"></i>
          <i class="icon fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);

    article.append($tweet);
    return article;
  };

  //make an Ajax request to /tweets and reciceve the array of tweet as JSON
  const loadTweets = () => {
    // $.ajax({
    //   url: "/tweets",
    //   type: "GET",
    //   dataType: "json",
    //   success: (tweet) => {
    //     renderTweets(tweet);
    //   },
    //   error: (error) => {
    //     console.error("An error occured, ", error);
    //   },
    // });

    $.get("/tweets")
      .then((tweet) => {
        renderTweets(tweet);
      })
      .catch((error) => {
        console.error("An error occured, ", error);
      });
  };

  $(".new-tweet__form").on("submit", function (event) {
    //Stop from form submitting normally
    event.preventDefault();

    //Serialize the form data and leave only the form input
    //It will display error message if input does not meet consditions
    const serializedTweet = $(".new-tweet__form").serialize(),
      tweetChars = serializedTweet.slice(5),
      errorMsg = $(".new-tweet__error"),
      maxChars = 140;

    if (!tweetChars) {
      errorMsg.text("Input can not be empty");
      errorMsg.slideDown();
      return;
    }

    if (tweetChars.length > maxChars) {
      errorMsg.text("Exceeds the maximum characteres");
      errorMsg.slideDown();
      return;
    }

    //If the input meet the condition, error message and input form will be cleared
    //And will display tweets without refreshing
    $.post("/tweets", tweetData).then((result) => {
      errorMsg.css("display", "none");
      $("#tweet-text").val("");
      loadTweets();
    });
  });

  loadTweets();
});
