module.exports = function(tweet) {
    tweet.created_at = new Date(tweet.created_at);
    return tweet;
};