## JavaScript Modules

| Module | Description |
|--------|-------------|
| `fetch-toots` | Responsible for getting the latest posts from a Mastodon instance. Will fetch posts older than the latest post id from the passed index database. |
| `fetch-tweets` | Responsible for getting the latest tweets. Will fetch posts older than the latest post id from the passed index database. |
| `db` | Used whenever you want to read/write tweets from/to storage. Has some helper methods for filtering/sorting. |
| `main` | The main script. Currently loads the database index, queries twitter api for all tweets after the latest tweet and stores the results to the db. |
