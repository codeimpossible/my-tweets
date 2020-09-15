const parseCreatedAt = require("../src/db/procs/parseCreatedAt");
const { strictEqual } = require('assert').strict;

module.exports.parseCreatedAt_sets_datetime = function(context) {
    let tweet = {
        created_at: "Thu Jan 01 00:00:00 +0000 1970"
    };

    tweet = parseCreatedAt(tweet);
    strictEqual(tweet.created_at.getUTCFullYear(), 1970);
};