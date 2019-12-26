require("dotenv").config();
const request = require("request");
const friendsInfo = require("./friends");

module.exports = {
  getFriendsInfo: callback => {
    let tftRanks = [];
    let counter = 0;
    friendsInfo.info().forEach(playerDetails => {
      getById(playerDetails, function(result) {
        tftRanks.push(result);
        counter++;
        if (counter === friendsInfo.info().length) {
          tftRanks = sortByRank(tftRanks);
          callback(tftRanks);
        }
      });
    });
  }
};

const sortByRank = tftSummoners => {
  return tftSummoners.sort(compareTier);
};

const compareTier = (summonerOne, summonerTwo) => {
  const tiers = {
    DIAMOND: 1,
    PLATINUM: 2,
    GOLD: 3,
    SILVER: 4,
    BRONZE: 5,
    IRON: 6,
    UNRANKED: 7
  };
  const ranks = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5
  };

  if (summonerOne.tier === summonerTwo.tier) {
    return ranks[summonerOne.rank] - ranks[summonerTwo.rank];
  } else return tiers[summonerOne.tier] - tiers[summonerTwo.tier];
};

const getById = (summoner, callback) => {
  request(
    `https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summoner.summonerId}`,
    { json: true, headers: { "X-Riot-Token": process.env.RIOT_TOKEN } },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode !== 200) {
        console.log(`Bad request: ${res.statusCode}: ${summoner.summonerId}`);
      } else if (body[0]) {
        callback(body[0]);
      } else {
        console.log(
          `No tft/league/v1 summoner info found for ${summoner.summonerName}:${summoner.summonerId} creating unranked placeholder`
        );
        callback({
          summonerName: summoner.summonerName,
          tier: "UNRANKED",
          rank: "",
          leaguePoints: "0",
          wins: 0,
          losses: 0
        });
      }
    }
  );
};
