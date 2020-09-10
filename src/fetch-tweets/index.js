const { promisify } = require('util');
const { OAuth } = require('oauth');

module.exports = async function(screen_name, since_id=-1) {
    const oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_CONSUMER_KEY,
        process.env.TWITTER_CONSUMER_SECRET,
        '1.0A', null, 'HMAC-SHA1'
    );
    const get = promisify(oauth.get.bind(oauth));
    let params = `screen_name=${screen_name}`;
    if (since_id > -1) {
        params += `&since_id=${since_id}`;
    }

    const body = await get(
        `https://api.twitter.com/1.1/statuses/user_timeline.json?${params}`,
        process.env.TWITTER_ACCESS_KEY,
        process.env.TWITTER_ACCESS_TOKEN_SECRET
    );

    return JSON.parse(body);
};