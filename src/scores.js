#!/usr/bin/env node
/* eslint-disable no-console */
const { exit } = require("process");

const abort = (msg) => {
  console.log(msg);
  exit();
};
const apiKey =
  process.env.API_KEY ||
  abort(
    "API key not provided. Signup at 'https://cricketdata.org/' to obtain one.",
  );
const baseUrl = "https://api.cricapi.com/v1";
const args = process.argv.slice(2);
const team =
  process.env.TEAM ||
  args[0] ||
  abort("Valid team name required, to fetch current score");
const currentScores = async () => {
  const scores = await (
    await fetch(`${baseUrl}/cricScore?apiKey=${apiKey}&offset=0`)
  ).json();
  if (!scores.data) {
    abort(JSON.stringify(scores, null, 4));
  }
  return scores.data
    .filter(
      (match) =>
        match.dateTimeGMT.split("T")[0] ===
          new Date().toISOString().split("T")[0] &&
        match.status !== "Match not started" &&
        (match.t1.toLocaleLowerCase().includes(team.toLocaleLowerCase()) ||
          match.t2.toLocaleLowerCase().includes(team.toLocaleLowerCase())),
    )
    .map(({ t1, t2, t1s, t2s, matchType, status }) => {
      const team1 = t1.split("[")[0].trim();
      const team2 = t2.split("[")[0].trim();
      return {
        match: `${team1} vs ${team2} (${matchType})`,
        team1,
        team2,
        team1Score: t1s,
        team2Score: t2s,
        status,
      };
    });
};
const displayScores = async () => {
  const scores = await currentScores();
  if (!scores) {
    abort("No scores found, has the match started?");
  }
  scores.forEach((score) => {
    const headline = `${new Date().toISOString().split("T")[1]}: ${
      score.match
    }`;
    const separator = Array(headline.length).join("-");
    console.log(headline);
    console.log(separator);
    console.log(` ${score.team1}: ${score.team1Score}`);
    console.log(` ${score.team2}: ${score.team2Score}`);
    console.log(score.status);
    console.log(separator);
    if (score.status.includes("won")) {
      exit();
    }
  });
};
(async () => {
  await displayScores();
})();
setInterval(displayScores, process.env.WAIT_TIME_IN_MS || 2000);
