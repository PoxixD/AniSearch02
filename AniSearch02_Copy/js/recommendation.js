window.onload = function () {
  setButtonTitle();
  roll();
};

function roll() {
  //This method declares which anime should get recommendations, how many there are + random recommendations
  let ID = localStorage.getItem("recommend");
  console.log(ID);
  let url = "https://api.jikan.moe/v3/anime/" + ID + "/recommendations";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let maxRecommendations = data.recommendations.length;
      let rndm = Math.floor(Math.random() * maxRecommendations);
      localStorage.setItem(
        "randomRecommendationID",
        data.recommendations[rndm].mal_id
      );
    });
}

function viewOnMAL() {
  let id = document.querySelector("#rec_mal_id").innerText;
  window.open("https://myanimelist.net/anime/" + id, "_blank");
}

function getAllInfos() {
  //puts the information into the table
  let id = localStorage.getItem("randomRecommendationID");
  let url = "https://api.jikan.moe/v3/anime/" + id;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let genreAmount = data.genres.length;
      console.log(genreAmount);
      let genreArray = [];
      for (let i = 0; i < genreAmount; i++) {
        genreArray[i] = " " + data.genres[i].name;
      }
      console.log(genreArray);

      document.querySelector("#rec_image").src = data.image_url;

      document.querySelector("#rec_title").innerText = data.title;
      document.querySelector("#rec_episodes").innerText = data.episodes;
      document.querySelector("#rec_score").innerText = data.score;
      document.querySelector("#rec_airing").innerText = data.airing;
      document.querySelector("#rec_desc").innerText = data.synopsis;
      document.querySelector("#rec_id").innerText = data.mal_id;
      document.querySelector("#rec_genre").innerText = genreArray;
    });
  roll(); //roll again to get a new recommendation
}

function setButtonTitle() {
  let id = localStorage.getItem("recommend");
  let url = "https://api.jikan.moe/v3/anime/" + id;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let title = data.title;
      document.querySelector("#button").textContent =
        "Get Recommendation for: " + " " + title;
    });
}
