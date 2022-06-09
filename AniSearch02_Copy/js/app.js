var dropDownIsOpen = false;

window.onload = function () {
  loadCharacterFromApi();

  document
    .querySelector("#random-button")
    .addEventListener("click", () => loadCharacterFromApi());
};

function loadCharacterFromApi() {

  //reset stuff
  document.getElementById("copy").innerHTML = "";
  if(dropDownIsOpen){
  document.getElementById("myDropdown").classList.toggle("show");
  dropDownIsOpen = false;
  }

  let randomNumber = Math.floor(Math.random() * 8000) + 1;
  let url = "https://animechan.vercel.app/api/random";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     
      document.querySelector("#name").innerText = "~" + data.character;
      document.querySelector("#quote").innerText = data.quote;
      document.querySelector("#anime").innerText = "From: " + data.anime;
    });
}

function buttonFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  dropDownIsOpen = true;
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function getQuoteByAnime(anime) {

  //reset stuff
  if(dropDownIsOpen){
    document.getElementById("myDropdown").classList.toggle("show");
    dropDownIsOpen = false;
    }
      document.getElementById("copy").innerHTML = "";

  rndm = Math.floor(Math.random() * 10) + 1;
  fetch('https://animechan.vercel.app/api/quotes/anime?title=' + anime)
  .then((response2) => response2.json())
    .then((data2) => {
     
      document.querySelector("#name").innerText = "~" + data2[rndm].character;
      document.querySelector("#quote").innerText = data2[rndm].quote;
      document.querySelector("#anime").innerText = "From: " + data2[rndm].anime;
    });
}

function getQuoteBySearch(){
  if(dropDownIsOpen){
    document.getElementById("myDropdown").classList.toggle("show");
    dropDownIsOpen = false;
    }

  let x = document.getElementById("myInput").value;
  console.log(x);
  rndm = Math.floor(Math.random() * 10) + 1;
  fetch('https://animechan.vercel.app/api/quotes/anime?title=' + x)
  .then((response2) => response2.json())
    .then((data2) => {
     
      document.querySelector("#name").innerText = "~" + data2[rndm].character;
      document.querySelector("#quote").innerText = data2[rndm].quote;
      document.querySelector("#anime").innerText = "From: " + data2[rndm].anime;
    }); 
}

function copy(){
  if(dropDownIsOpen){
    document.getElementById("myDropdown").classList.toggle("show");
    dropDownIsOpen = false;
    }

  var range = document.createRange();
  range.selectNode(document.getElementById("quote"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges();// to deselect
 

  document.getElementById("copy").innerHTML = "Copied quote to clipboard";

}
