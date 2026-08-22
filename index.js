// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2606-Malikai"; // Make sure to change this!
const API = BASE + COHORT;
const app = document.querySelector("#app");
const form = document.querySelector("#new-player-form");
let teams = [];

async function getPlayers() {
  const response = await fetch(API + "/players");
  const data = await response.json();
  const players = data.data.players;

  for (let i = 0; i < players.length; i++) {
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");
    const playerName = document.createElement("p");
    const playerImage = document.createElement("img");
    const detailsButton = document.createElement("button");
    const backButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    playerImage.src = players[i].imageUrl;
    playerImage.alt = players[i].name;
    playerName.textContent = players[i].name;
    detailsButton.textContent = "Details";
    playerCard.appendChild(playerImage);
    playerCard.appendChild(playerName);
    playerCard.appendChild(detailsButton);
    playerCard.appendChild(deleteButton);
    app.appendChild(playerCard);
    deleteButton.addEventListener("click", async function () {
      console.log(players[i].id);
      await fetch(API + "/players/" + players[i].id, {
        method: "DELETE",
      });
      app.innerHTML = "";
      await getPlayers();
    });
    detailsButton.addEventListener("click", function () {
      console.log(players[i].name);
      app.innerHTML = "";
      const detailsName = document.createElement("h2");
      detailsName.textContent = players[i].name;
      const detailsId = document.createElement("p");
      detailsId.textContent = players[i].id;
      app.appendChild(detailsName);
      app.appendChild(detailsId);
      const detailsBreed = document.createElement("p");
      detailsBreed.textContent = players[i].breed;
      app.appendChild(detailsBreed);
      const detailsStatus = document.createElement("p");
      detailsStatus.textContent = players[i].status;
      app.appendChild(detailsStatus);
      const detailsTeam = document.createElement("p");
      const matchingTeam = teams.find((team) => team.id === players[i].teamId);
      if (matchingTeam) {
        detailsTeam.textContent = "Team: " + matchingTeam.name;
      } else {
        detailsTeam.textContent = "Team: Unassigned";
      }
      app.appendChild(detailsTeam);
      const detailsImage = document.createElement("img");
      detailsImage.classList.add("details-img");
      detailsImage.src = players[i].imageUrl;
      app.appendChild(detailsImage);
      backButton.textContent = "Back to all players.";
      app.appendChild(backButton);
      backButton.addEventListener("click", function () {
        app.innerHTML = "";
        getPlayers();
      });
    });

    console.log(players[i]);
  }
}
async function getTeams() {
  const response = await fetch(API + "/teams");
  const data = await response.json();
  teams = data.data.teams;
  console.log(teams);
}
getTeams();
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const nameInput = document.querySelector("#name");
  const breedInput = document.querySelector("#breed");
  const name = nameInput.value;
  const breed = breedInput.value;
  const newPlayer = {
    name: name,
    breed: breed,
  };
  await fetch(API + "/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlayer),
  });
  app.innerHTML = "";
  await getPlayers();
  nameInput.value = "";
  breedInput.value = "";
});
getPlayers();
