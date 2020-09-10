const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const data_dir = path.resolve(__dirname, '../data');

const idx = require('./../data/index.json');
const sources = idx.sources.map(src => {
    return require(`./../${src}`);
});

let __id = sources.length;
const newid = () => ++__id;

module.exports = {
    db: {
        latestId: idx.latestId,
        sources
    },
    writeSource: async function(tweets) {
        const tweet_json = JSON.stringify(tweets);
        const id = md5(tweet_json);
        return new Promise(function(resolve, reject) {
            fs.writeFile(`${data_dir}/${id}.json`, tweet_json, (err) => {
                if (err) return reject(err);
                const lastTweet = tweets[tweets.length - 1];
                idx.latestId = lastTweet.id;
                idx.sources.push(`${id}.json`);
                fs.writeFile(`${data_dir}/index.json`, JSON.stringify(idx), (err) => {
                    if (err) {
                        idx = require('./../data/index.json');
                        return reject(err);
                    }
                    resolve(tweets);
                });
            });
        });
    }
};