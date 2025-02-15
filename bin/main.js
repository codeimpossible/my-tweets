const fs = require('fs');
const path = require('path');
const { index, storeTweets } = require('./../src/db');
const config = require('./config.json');

const fetchTasks = [
    require('./../src/fetch-tweets'),
    require('./../src/fetch-toots'),
];

const args = process.argv.slice(2);

if (args.includes('--help')) {
    console.log('Usage: my-tweets');
    console.log('    Fetches tweets and posts from twitter and mastodon and stores them in an indexed json catalog. Configuration is specified via a config.json file.');
    console.log('');
    console.log('  Configuration');
    console.log('  {');
    console.log('    "mastodon": {');
    console.log('      "screen_name": "exampleUser"             // the screen name of the user to fetch posts for');
    console.log('      "host": "http://mastodon.example.com"    // the hostname of the mastodon instance to interact with');
    console.log('    },');
    console.log('    "twitter": {');
    console.log('      "screen_name": "exampleUser"             // the screen name of the user to fetch posts for');
    console.log('    },');
    console.log('  }');
    console.log('');
    console.log('Example: $ my-tweets');
    process.exit(1);
}

process.on('uncaughtException', function (err) {
    if (err) {
        console.log(`uncaught exception ${err}`, err, err.stack);
        console.log(JSON.stringify(err));
        process.exit(1);
    }
});

(async function Main() {
    for(const fetcher of fetchTasks) {
        try {
            const credentialsFile = path.resolve(__dirname, '../credentials.json');
            if (fs.existsSync(credentialsFile)) {
                const credentalsJson = fs.readFileSync(credentialsFile).toString();
                const credentials = JSON.parse(credentalsJson);
                console.log(credentials);
                fetcher.setCredentials(credentials);
            }
            var data = await fetcher.fetch(config[fetcher.type], index);
            if (data.length > 0) {
                await storeTweets(data, fetcher.type);
                console.log(`🐣 stored ${data.length} posts from ${fetcher.type}.`);
            }
        } catch (e) {
            console.log(`exception while fetching from ${fetcher.type}.`, e, e.stack);
            console.log(JSON.stringify(e));
        }
    }
    process.exit(0);
})();
