const db = require("../src/db");
const { strictEqual } = require('assert').strict;

module.exports.byDate_returns_oldest_tweet_async = async function (context) {
    let tweets = await db.getTweets();
    let sortedByDate = tweets.sort(db.sorts.byDate);
    let oldestTweet = sortedByDate[0];
    strictEqual(oldestTweet.created_at.getUTCFullYear(), 1970);
};

module.exports.byDateDesc_returns_newest_tweet_async = async function (context) {
    let tweets = await db.getTweets();
    let sortedByDate = tweets.sort(db.sorts.byDateDesc);
    let oldestTweet = sortedByDate[0];
    strictEqual(oldestTweet.created_at.getUTCFullYear(), 2020);
};