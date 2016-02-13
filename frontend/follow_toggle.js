var FollowToggle = function ($el, options) {
  this.$el = $el;
  this.userID = this.$el.attr("data-user-id") || options.userid;
  this.followState = this.$el.attr("data-initial-follow-state") || options.followState;
  this.render();
  this.$el.on('click', this.handleClick.bind(this));
};

FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed") {
    this.$el.removeAttr("disabled");
    this.$el.html("Follow!");
  } else if (this.followState === "followed") {
    this.$el.removeAttr("disabled");
    this.$el.html("Unfollow!");
  } else if (this.followState === "following" ||
             this.followState === "unfollowing"){

    this.$el.attr("disabled", "disabled");
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  if (this.followState === "unfollowed") {
    this.followState = "following";
    this.render();
    $.ajax({
      url: "/users/"+this.userID+"/follow",
      type: "POST",
      dataType: "json",
      success: function(resp){
        this.followState= "followed";
        this.render();
      }.bind(this),
      error: function(resp){
        alert("Error");
      }
    });
  } else if (this.followState === "followed") {
    this.followState = "unfollowing";
    this.render();
    $.ajax({
      url: "/users/"+this.userID+"/follow",
      type: "DELETE",
      dataType: "json",
      success: function(resp){
        this.followState= "unfollowed";
        this.render();
      }.bind(this),
      error: function(resp){
        alert("Error");
      }
    });
  }




};



module.exports = FollowToggle;
