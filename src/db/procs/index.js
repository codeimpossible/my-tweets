const procs = [
    require('./parseCreatedAt')
];

module.exports.processorsCount = procs.length;
module.exports.processTweet = function(tweet) {
    for(var i = 0; i <= procs.length - 1; i++) {
        let p = procs[i];
        tweet = p(tweet);
    }
    return tweet;
}