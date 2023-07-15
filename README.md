# my-tweets
My tweets and mastodon posts, backed up and committed automatically via github actions.

## Loading my tweets

```js
import { loadTweets, selectors, sorts } from '@codeimpossible/my-tweets';

// ... later
// read the latest tweet from the db

let tweets = await loadTweets();
let latest = selectors.first(tweets.sort(sorts.byDateDesc));
console.log(latest);

/*
  {
    "created_at": "Tue Sep 15 18:53:49 +0000 2020",
    "id": 1305942917287153700,
    "id_str": "1305942917287153664",
    "text": "You know what’d be cool? A sequel tv series to three billboards outside ebbing missouri.",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [],
      "urls": []
    },
  ...
*/

```
