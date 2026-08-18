// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2606-Malikai"; // Make sure to change this!
const API = BASE + COHORT;
const app = document.querySelector("#app");
async function getPlayers() {
  const response = await fetch(API + "/players");
  const data = await response.json();
  const players = data.data.players;
  for (let i = 0; i < players.length; i++) {
    const playerCard = document.createElement("div");
    const playerName = document.createElement("p");
    const playerImage = document.createElement("img");
    playerImage.src = players[i].imageUrl;
    playerName.textContent = players[i].name;
    playerCard.appendChild(playerName);
    playerCard.appendChild(playerImage);
    app.appendChild(playerCard);
    console.log(players[i].name);
  }
}
getPlayers();
