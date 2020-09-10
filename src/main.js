const fetchTweets = require('./fetch-tweets');
const db = require('./db');

(async function Main(screen_name, since) {
    since = since || -1;
    const tweets = await fetchTweets(screen_name, since);
    if (tweets.length > 0 && !tweets.errors) {
        await db.writeSource(tweets);
    }
})('codeimpossible', db.db.latestId);