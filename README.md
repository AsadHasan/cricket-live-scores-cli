# Cricket live scores cli

Basic CLI to stream live cricket scores (via cricket-live-scores API, which does require a free API key) in a terminal, for those engaged in technical work and too busy to view in browser, and just wishing to keep an eye on their match's score via an extra terminal window/tab.

# Usage

1. Sign up for API key, for free, at https://cricketdata.org/.
2. Set environment variable `API_KEY`: `export API_KEY=<api-key>`
3. Run:
   - Via Node (requires Node>=18): Either
     - Directly via shell, if Node is on path: `./src/scores.mjs <team-name, whose match's score is required, for e.g. England> <wait-time between refresh, in ms; for e.g. 10000 for 10sec wait between score update>`.
     - Or, via Node: `node src/scores.mjs <team-name> <wait-time in ms>`.
     - Or, via npm:
       - Set environment variables: `API_KEY` , `TEAM` and `WAIT_TIME_IN_MS`
       - `npm run live-cricket-score`
   - Via Docker-Compose:
     - Set environment variables: `API_KEY` , `TEAM` and `WAIT_TIME_IN_MS`
     - `docker compose run score`

# To-do

Distribute via NPM and Homebrew.

# Contributing

Open a PR.
