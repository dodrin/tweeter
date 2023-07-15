/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const article = $("<section>");
    const daysAgo = jQuery.timeago(tweet.created_at);

    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user">
          <img src="https://i.imgur.com/73hZDYK.png" alt="face-icon"/>
          <div class="user-name">${tweet.user.name}</div>
        </div>
        <div class="user-id">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
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
  const loadtweets = () => {
    $.ajax({
      url: "/tweets",
      type: "GET",
      datatype: "json",
      success: (result) => {
        renderTweets(result);
      },
      error: (error) => {
        console.error("An error occured, ", error);
      },
    });
  };

  const postTweet = () => {
    const tweetData = $(".new-tweet__form").serialize();
    $.post("/tweets", tweetData).then((result) => {
      //Display new tweet without refreshing
      loadtweets();
    });
  };

  loadtweets();

  $(".new-tweet__form").on("submit", function (event) {
    //Stop from form submitting normally
    event.preventDefault();
    postTweet();
  });
});
