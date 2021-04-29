function clear() {
    var x = document.getElementsByClassName("info");
    while(x[0]) {
      x[0].remove();
    }
}

function drawResult(result) {
  let elements = [];
  let title = document.createElement("h2");
  if (result.media_type == "movie") {
    title.innerHTML = result.title;
  } else if (result.media_type == "tv") {
    title.innerHTML = result.name;
  }
  elements.push(title);

  let desc = document.createElement("p");
  desc.innerHTML = result.overview;
  elements.push(desc);

  let img = document.createElement("img");
  let file_path = result.poster_path;

  let url = getImageFullUrl(file_path);

  // let base = localStorage.getItem("base_url");
  // let size = localStorage.getItem("poster_max_size");
  //
  // let url = base + size + file_path;
  img.src = url;
  elements.push(img);


  elements.forEach((item) => {
    item.classList.add("info");
    document.getElementById("info-container").appendChild(item);
  });


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
