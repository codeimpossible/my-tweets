## GitHub Actions

| Module | Description |
|--------|-------------|
| `fetch-tweets.yml` | Runs once a week, based on a cron schedule configuration. Downloads all the tweets I've posted since the last download and stores them in a `.json` file in the `/data` directory. |
| `publish-gpr.yml` | Publishes a new NPM package version to GitHub Packages. |
