var FollowToggle = require("./follow_toggle.js");
var UsersSearch = require("./users_search.js");
var TweetCompose = require("./tweet_compose.js");

$(function () {
  $(".follow-toggle").each(function (index, el) {
    new FollowToggle($(el));
  });

  $(".users-search").each(function (index, el) {
    new UsersSearch($(el));
  });

  $(".tweet-compose").each(function (index, el) {
    new TweetCompose($(el));
  });
});
