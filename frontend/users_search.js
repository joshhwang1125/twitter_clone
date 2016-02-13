var FollowToggle = require("./follow_toggle.js");

var UsersSearch = function ($el) {
  this.$el = $el;
  this.$inputBox = this.$el.find(".users-search-username");
  this.$resultsUl = this.$el.find(".users");

  this.$inputBox.on('input', this.handleInput.bind(this));
};

UsersSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  var val = { query: this.$inputBox.val() };

  $.ajax({
    url: "/users/search",
    type: "GET",
    data: val,
    dataType: "json",
    success: function(resp){
      console.log(resp);
      this.renderResults(resp);
    }.bind(this),
    error: function(resp){
      // alert("Error");
    }
  });
};

UsersSearch.prototype.renderResults = function (resp) {
  // debugger;
  this.$resultsUl.empty();
  resp.forEach(function (el) {
    var li = "<li><a href=\'/users/" + el['id'] + "\'>" + el['username'] + "</a></li>";
    var followState = ( el["followed"] ? "followed" : "unfollowed");
    var buttonHTML = "<button class=\"follow-toggle\"" +
    "data-user-id=\"" + el["id"] + "\"" +
    "data-initial-follow-state=\"" + followState + "\"></button>";
    this.$resultsUl.append(li).append(buttonHTML);
    // var buttonHTMLElement = $("")
    // var button = new FollowToggle($(buttonHTML));
  }.bind(this));

  $(".follow-toggle").each(function (index, el) {
    new FollowToggle($(el));
  });
};

module.exports = UsersSearch;
