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

  //takes in array of tweet objects and add at the beginning of tweets
  const renderTweets = function (tweets) {
    $(".new-tweet__error").css("display", "none");
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  //takes in tweet object and return tweet element
  const createTweetElement = function (tweet) {
    const tweets = $("<section>");
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

    tweets.append($tweet);
    return tweets;
  };

  //make an Ajax request to /tweets and reciceve the array of tweet as JSON
  const loadTweets = () => {

    $.get("/tweets")
      .then((tweet) => {
        renderTweets(tweet);
      })
      .catch((error) => {
        console.error("An error occured, ", error);
      });
  };

  //event listner for submitting new tweet form
  $(".new-tweet__form").on("submit", function (event) {
    event.preventDefault();

    //Serialize the form data and leave only the form input
    //It will display error message if input does not meet the conditions
    const serializedData = $(this).serialize(),
      tweetLength = $("#tweet-text").val().length,
      errorMsg = $(".new-tweet__error"),
      maxChars = 140;

    errorMsg.slideUp(250);

    if (!tweetLength) {
      errorMsg.text("Input can not be empty");
      errorMsg.slideDown();
      return;
    }

    if (tweetLength > maxChars) {
      errorMsg.text("Exceeds the maximum characteres");
      errorMsg.slideDown();
      return;
    }

    //If the input meet the conditions, error message and input form will be cleared
    //then will display tweets without refreshing
    $.post("/tweets", serializedData).then((result) => {
      errorMsg.css("display", "none");
      $("#tweet-text").val("");
      $(".counter").val(140);
      loadTweets();
    });
  });

  loadTweets();
});
