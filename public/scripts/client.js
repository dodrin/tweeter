/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  //make an Ajax request to /tweets and reciceve the array of tweet as JSON
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: (tweet) => {
        renderTweets(tweet);
      },
      error: (error) => {
        console.error("An error occured, ", error);
      },
    });
  };

  //Fucntion to re-encode text to prevenx XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  
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

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const postTweet = () => {
    const tweetData = $(".new-tweet__form").serialize();
    const tweetChars = tweetData.slice(5);

    if (tweetChars === "" || tweetChars === null) {
      alert("Invalid input");
    } else if (tweetChars.length > 140) {
      alert("Tweet exceeds the maximum length");
    } else {
      $.post("/tweets", tweetData).then((result) => {
        //Display new tweet without refreshing
        loadTweets();
      });
    }
  };

  loadTweets();

  
  $(".new-tweet__form").on("submit", function (event) {
    //Stop from form submitting normally
    event.preventDefault();
    postTweet();
  });

});