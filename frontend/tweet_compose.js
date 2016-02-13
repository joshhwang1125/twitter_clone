var TweetCompose = function ($el) {
  this.$el = $el;

  this.$el.on('submit', this.submit.bind(this));
};

TweetCompose.prototype.submit = function (e) {
  e.preventDefault();
  var tweet = this.$el.serializeJSON();
  var $inputs = this.$el.find(':input');
  $inputs.prop('disabled', true);

  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    data: tweet,
    success: function(resp){
      this.handleSuccess(resp);
    }.bind(this)
  });

};

TweetCompose.prototype.handleSuccess = function (resp) {
  this.clearInput();
  var $inputs = this.$el.find(':input');
  $inputs.prop('disabled', false);
  var feed = this.$el.attr("data-tweets-ul");
  var $tweets = $(feed);


};

TweetCompose.prototype.clearInput = function () {
  var $inputs = this.$el.find('.tweet-compose-input');
  $inputs.val('');
};

module.exports = TweetCompose;
