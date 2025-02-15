const axios = require('axios');
const { MASTODON } = require('../tootTypes');

let credentials = {
    mastodonToken: process.env.MASTODON_USER_TOKEN,
};

module.exports.setCredentials = function(newCredentials) {
    credentials = newCredentials;
};

module.exports.type = MASTODON;

module.exports.fetch = async function(config, idx) {
    const { mastodonToken } = credentials;
    const { screen_name, host } = config;
    const since_id = idx.latest_mastodon_id || -1;
    // get the id of the user
    const idApiUri = `${host}/api/v1/accounts/lookup?acct=@${screen_name}`;
    const userInfoResponse = await axios.get(idApiUri, {
        headers: {
            'Authorization': `Bearer ${mastodonToken}`
        }
    });
    console.log(userInfoResponse.data);
    const { id } = userInfoResponse.data;

    // get the toots
    const tootsApiUri = `${host}/api/v1/accounts/${id}/statuses`;
    const tootsResponse = await axios.get(tootsApiUri, {
        params: {
            since_id
        },
        headers: {
            'Authorization': `Bearer ${mastodonToken}`
        }
    });
    let toots = tootsResponse.data;
    toots = toots.map(toot => {
        toot.toot_type = MASTODON;
        return toot;
    });

    return toots;
};
