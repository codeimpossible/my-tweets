const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const data_dir = path.resolve(__dirname, '../../data');
const {processTweet, processorsCount} = require('./procs');
const idx = require('./../../data/index.json');
const writeJson = require('./writeJson');

const sources = idx.sources.map(src => {
    return require(`${data_dir}/${src}`);
});

let tweets = [];
let tweetsLoaded = false;
const loadTweets = async function(reload=false) {
    if (tweetsLoaded && !reload) {
        return tweets;
    }
    return new Promise(function(resolve) {
        sources.forEach(src => {
            src.forEach(item => {
                let tweet = processTweet(item.tweet);
                tweets.push(tweet);
            });
        });

        // console.log(`[INFO] loaded ${tweets.length} from data through ${processorsCount} processors.`);
        tweetsLoaded = true;
        resolve(tweets);
    });
};

const saveIndex = async function() {
    await writeJson(path.resolve(data_dir, './index.json'), idx);
}

const sorts = {
    byDate: (a, b) => {
        return a.created_at - b.created_at;
    },
    byDateDesc: (a, b) => {
        return sorts.byDate(b, a);
    }
};

const selectors = {
    first: (tweets, filter = null) => {
        if (filter) {
            let filtered = tweets.filter(filter);
            return filtered[0];
        }
        return tweets[0];
    },
    last: (tweets, filter = null) => {
        return selectors.first(tweets.reverse(), filter);
    }
};

module.exports.index = idx;
module.exports.getTweets = loadTweets;
module.exports.sorts = sorts;
module.exports.selectors = selectors;

module.exports.storeTweets = async function(tweets) {
    // find the latest id in the collections
    const latestTweet = selectors.first(tweets.sort(sorts.byDateDesc));
    const json = JSON.stringify(tweets);
    const id = md5(json);
    await writeJson(path.resolve(data_dir, `${id}.json`), tweets);
    idx.latestId = latestTweet.id_str;
    idx.sources.push(`${id}.json`);
    await saveIndex();
};