var ipcRenderer = require('electron').ipcRenderer;

function clear() {
    var x = document.getElementsByClassName("info");
    while(x[0]) {
      x[0].remove();
    }
}

function buttonPress(result) {
  console.log(result);
  saveImagePath(title, result.poster_path);
  ipcRenderer.send("closeForm");
}

//TODO: move api specifics to api.js
function drawResult(result) {
  let elements = [];
  let title = document.createElement("h2");
  let date = document.createElement("p");
  if (result.media_type == "movie") {
    title.innerHTML = result.title;
    date.innerHTML = result.release_date;
  } else if (result.media_type == "tv") {
    date.innerHTML = result.first_air_date;
    title.innerHTML = result.name;
  }
  elements.push(title);
  elements.push(date);

  let desc = document.createElement("p");
  desc.innerHTML = result.overview;
  elements.push(desc);

  let img = document.createElement("img");
  img.classList.add("info-poster");
  let file_path = result.poster_path;

  let url = getImageFullUrl(file_path);

  // let base = localStorage.getItem("base_url");
  // let size = localStorage.getItem("poster_max_size");
  //
  // let url = base + size + file_path;
  img.src = url;
  elements.push(img);

  let button = document.createElement("button");
  button.innerHTML = "Confirm";
  button.onclick = function() {
    buttonPress(result);
  };
  elements.push(button);

  let div = document.createElement("div");
  div.classList.add("info-sub-container");
  elements.forEach((item) => {
    item.classList.add("info");
    div.appendChild(item);
  });


  document.getElementById("info-container").appendChild(div);
}


// Called on keydown in text input
function enter() {
  if (event.keyCode == 13) {
    let text = document.getElementById('title').value;
    console.log(text);
    sendRequest(text).then( result => {
      // if (result.Response == "True") {
      //   console.log(result);
      //   drawResult(result);
      // } else {
      //   console.log("Not Found");
      // }

      if (result.total_results > 0) {
        clear();
        result.results.forEach((item) => {
          drawResult(item);
        });
      } else {
        console.log("Not Found");
      }
    });
  }
}

ipcRenderer.on('UpdateName', function (event, name) {
    console.log("main ipc recieved");
    console.log(name);
    title = name;
    document.getElementById("header").innerHTML = name;
});
