const { promisify } = require('util');
const { OAuth } = require('oauth');
const { TWITTER, MASTODON } = require('../tootTypes');

let credentials = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessKey: process.env.TWITTER_ACCESS_KEY,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

module.exports.setCredentials = function(newCredentials) {
    credentials = newCredentials;
}

module.exports.type = TWITTER;

module.exports.fetch = async function(config, idx) {
    since_id = idx.latest_twitter_id || idx.latestId;
    const { screen_name } = config;
    const oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        credentials.consumerKey,
        credentials.consumerSecret,
        '1.0A', null, 'HMAC-SHA1'
    );
    const get = promisify(oauth.get.bind(oauth));
    const body = await get(
        `https://api.twitter.com/2/users/${screen_name}/tweets?since_id=${since_id}`,
        credentials.accessKey,
        credentials.accessSecret
    );

    const tweets = JSON.parse(body);

    tweets = tweets.map(toot => {
        toot.toot_type = TWITTER;
        toot.id_num = toot.id;
        toot.id = toot.id_str;
        return toot;
    });

    return tweets;
};
