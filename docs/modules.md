## JavaScript Modules

| Module | Description |
|--------|-------------|
| `fetch-tweets` | Responsible for getting the latest tweets. Can be given a tweet id to use as a filter, returning only the tweets that have been posted after that id. |
| `db` | Used whenever you want to read/write tweets from/to storage. Has some helper methods for filtering/sorting. |
| `main` | The main script. Currently loads the database index, queries twitter api for all tweets after the latest tweet and stores the results to the db. |