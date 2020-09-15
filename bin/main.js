const fs = require('fs');
const path = require('path');
const { fetchTweets, setCredentials } = require('./../src/fetch-tweets');
const { index, storeTweets } = require('./../src/db');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: my-tweets twitter_user');
    console.log(' twitter_user         The twitter username of the user to pull tweets for');
    console.log('');
    console.log('Example: $ my-tweets codeimpossible');
    process.exit(1);
}

const credentialsFile = path.resolve(__dirname, '../credentials.json');
if (fs.existsSync(credentialsFile)) {
    const credentalsJson = fs.readFileSync(credentialsFile).toString();
    const credentials = JSON.parse(credentalsJson);
    console.log(credentials);
    setCredentials(credentials);
}

(async function Main(screen_name, since) {
    since = since || -1;
    const tweets = await fetchTweets(screen_name, since);
    if (tweets.length > 0 && !tweets.errors) {
        await storeTweets(tweets);
        console.log(`🐣 stored ${tweets.length} tweets.`);
    }
    process.exit(0);
})(args[0], index.latestId);
