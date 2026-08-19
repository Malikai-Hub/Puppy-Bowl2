// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2606-Malikai"; // Make sure to change this!
const API = BASE + COHORT;
const app = document.querySelector("#app");
const form = document.querySelector("#new-player-form");

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
    playerImage.src = players[i].imageUrl;
    playerName.textContent = players[i].name;
    detailsButton.textContent = "Details";
    playerCard.appendChild(playerImage);
    playerCard.appendChild(playerName);
    playerCard.appendChild(detailsButton);
    app.appendChild(playerCard);
    detailsButton.addEventListener("click", function () {
      console.log(players[i].name);
      app.innerHTML = "";
      const detailsName = document.createElement("h2");
      detailsName.textContent = players[i].name;
      app.appendChild(detailsName);
      const detailsBreed = document.createElement("p");
      detailsBreed.textContent = players[i].breed;
      app.appendChild(detailsBreed);
      const detailsStatus = document.createElement("p");
      detailsStatus.textContent = players[i].status;
      app.appendChild(detailsStatus);
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

    console.log(players[i].name);
  }
}
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
