window.onload = function () {
  for (let i = 0; i < 10; i++) {
    if (localStorage.getItem(i) != null) {
      document.querySelector("#favouriteTitle" + i).textContent =
        localStorage.getItem(i);
    }
  }
};

function remove(number) {
  if (localStorage.getItem(number) == null) {
    window.alert("Error - Add an anime first");
  } else {
    document.querySelector("#favouriteTitle" + number).innerHTML = "Title";
    document.querySelector("#score" + number).innerHTML = "Personal Score";

    let title = localStorage.getItem(number);
    localStorage.removeItem(number);
    localStorage.removeItem(title);
    localStorage.removeItem("Score" + number);
  }
}

function getMoreInformation(number) {
  if (localStorage.getItem(number) == null) {
    window.alert("Error - Add an anime first");
  } else {
    let title = localStorage.getItem(number);
    window.open(
      "https://myanimelist.net/anime/" + localStorage.getItem(title),
      "_blank"
    );
  }
}

function getScore(number) {
  if (localStorage.getItem("Score" + number) == null) {
    window.alert("Error - Add an anime first");
  } else {
    if (
      document.querySelector("#score" + number).textContent == "Personal Score"
    ) {
      document.querySelector("#score" + number).textContent =
        localStorage.getItem("Score" + number) + "/10";
    } else {
      document.querySelector("#score" + number).textContent = "Personal Score";
    }
  }
}

function share(number) {
  if (localStorage.getItem("Score" + number) == null) {
    window.alert("Error - Add an anime first");
  } else {
    let title = localStorage.getItem(number);
    let score = localStorage.getItem("Score" + number);
    let message =
      "I rated" +
      " " +
      title +
      " " +
      "with:" +
      " " +
      score +
      "/10" +
      " " +
      "at https://anisearch02.netlify.app - Your Site for anime searches and anime quotes!";
    window
      .open("https://ws.zerotwohub.tk:25566/posts?message=" + message, "_blank")
      .focus();
  }
}

function recommend(number) {
  if (localStorage.getItem(number) == null) {
    window.alert("Error - Add an anime first");
  } else {
    window.open("recommendation.html");

    let title = localStorage.getItem(number);
    let ID = localStorage.getItem(title);
    localStorage.setItem("recommend", ID);
  }
}
