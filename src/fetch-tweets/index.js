const { promisify } = require('util');
const { OAuth } = require('oauth');

let credentials = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessKey: process.env.TWITTER_ACCESS_KEY,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

module.exports.setCredentials = function(newCredentials) {
    credentials = newCredentials;
}

module.exports.fetchTweets = async function(screen_name, since_id=-1) {
    const oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        credentials.consumerKey,
        credentials.consumerSecret,
        '1.0A', null, 'HMAC-SHA1'
    );
    const get = promisify(oauth.get.bind(oauth));
    let params = `screen_name=${screen_name}`;
    if (since_id > -1) {
        params += `&since_id=${since_id}`;
    }

    const body = await get(
        `https://api.twitter.com/1.1/statuses/user_timeline.json?${params}`,
        credentials.accessKey,
        credentials.accessSecret
    );

    return JSON.parse(body);
};