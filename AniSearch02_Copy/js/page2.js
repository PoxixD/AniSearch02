var animePos = 0;
var favouritePos = 0;
var sessionStorageArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

window.onload = function () {
  document.getElementById("more").style.display = "none";

  if (animePos == 0) {
    document.getElementById("Previous").setAttribute("disabled", "disabled");
    document.getElementById("Previous").classList.remove("btn-primary");
    document.getElementById("Previous").classList.add("btn-muted");
  }
};

function loadAnime() {
  animePos = 0;
  if (animePos == 0) {
    document.getElementById("Previous").setAttribute("disabled", "disabled");
    document.getElementById("Previous").classList.remove("btn-primary");
    document.getElementById("Previous").classList.add("btn-muted");
  }
  let animeName = document.getElementById("searchAnime").value;
  let url = "https://api.jikan.moe/v3/search/anime?q=" + animeName;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#title").innerText = data.results[animePos].title;
      console.log(data.results[animePos].image_url);
      document.getElementById("image").src = data.results[animePos].image_url;
      document.querySelector("#Episodes").innerText =
        data.results[animePos].episodes;
      document.querySelector("#Score").innerText =
        data.results[animePos].score + "/10";
      document.querySelector("#Airing").innerText =
        data.results[animePos].airing;
      document.querySelector("#desc").innerText =
        data.results[animePos].synopsis;
      document.querySelector("#ID").innerText = data.results[animePos].mal_id;
    });

  document.getElementById("more").style.display = "block";
}

function previous() {
  let AnimeName = document.getElementById("searchAnime").value;

  animePos -= 1;
  if (animePos == 0) {
    document.getElementById("Previous").setAttribute("disabled", "disabled");
    document.getElementById("Previous").classList.remove("btn-primary");
    document.getElementById("Previous").classList.add("btn-muted");
  }
  let url = "https://api.jikan.moe/v3/search/anime?q=" + AnimeName;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#title").innerText = data.results[animePos].title;
      console.log(data.results[animePos].image_url);
      document.getElementById("image").src = data.results[animePos].image_url;
      document.querySelector("#Episodes").innerText =
        data.results[animePos].episodes;
      document.querySelector("#Score").innerText =
        data.results[animePos].score + "/10";
      document.querySelector("#Airing").innerText =
        data.results[animePos].airing;
      document.querySelector("#desc").innerText =
        data.results[animePos].synopsis;
      document.querySelector("#ID").innerText = data.results[animePos].mal_id;
    });
}

function next() {
  let AnimeName = document.getElementById("searchAnime").value;

  animePos += 1;
  console.log(animePos);
  let url = "https://api.jikan.moe/v3/search/anime?q=" + AnimeName;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#title").innerText = data.results[animePos].title;
      console.log(data.results[animePos].image_url);
      document.getElementById("image").src = data.results[animePos].image_url;
      document.querySelector("#Episodes").innerText =
        data.results[animePos].episodes;
      document.querySelector("#Score").innerText =
        data.results[animePos].score + "/10";
      document.querySelector("#Airing").innerText =
        data.results[animePos].airing;
      document.querySelector("#desc").innerText =
        data.results[animePos].synopsis;
      document.querySelector("#ID").innerText = data.results[animePos].mal_id;
    });

  if (animePos !== 0) {
    document.getElementById("Previous").removeAttribute("disabled", "disabled");
    document.getElementById("Previous").classList.add("btn-primary");
    document.getElementById("Previous").classList.remove("btn-muted");
  }
}

function addToFavourites() {
  //Überprüfen  ob ein Anime ausgewählt wurde
  if (document.querySelector("#title").innerText == "-") {
    alert("Error - Kein Anime ausgewählt");
  } else {
    let personalScore = prompt("You Personal Score (from 0-10):");
    if (personalScore == null || personalScore == "") {
      //User cancelled the prompt
    }
    if (
      !(
        personalScore >= 0 &&
        personalScore <= 10 &&
        !isNaN(personalScore) &&
        personalScore !== null &&
        personalScore !== ""
      )
    ) {
      alert("Can you read?");
    } else {
      localStorage.setItem("Score" + favouritePos, personalScore);

      let url =
        "https://api.jikan.moe/v3/anime/" +
        document.querySelector("#ID").innerText;
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!(favouritePos >= 10)) {
            localStorage.setItem(
              document.querySelector("#title").innerText,
              document.querySelector("#ID").innerText
            );
            localStorage.setItem(
              favouritePos,
              document.querySelector("#title").innerText
            );
            sessionStorageArray[favouritePos] = localStorage.getItem(
              document.querySelector("#title").innerText
            );
            favouritePos += 1;
            console.log(sessionStorageArray);
          } else {
            document.querySelector("#favouritesError").innerText =
              "You reached the maximum of 10 favourites!" +
              "\n" +
              "You can remove some anime at" +
              " ";
            document.querySelector("#favouritesError").innerHTML +=
              "<a href='favourites.html'>Favourites</a>";
          }
        });
    }
  }
}
