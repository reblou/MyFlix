function clear() {
    var x = document.getElementsByClassName("info");
    while(x[0]) {
      x[0].remove();
    }
}

function drawResult(result) {
  clear();
  let elements = [];
  let title = document.createElement("h2");
  title.innerHTML = result.Title;
  elements.push(title);

  let desc = document.createElement("p");
  desc.innerHTML = result.Plot;
  elements.push(desc);

  let img = document.createElement("img");
  img.src = result.Poster;
  elements.push(img);


  elements.forEach((item) => {
    item.classList.add("info");
    document.getElementById("info-container").appendChild(item);
  });


}


function enter() {
  if (event.keyCode == 13) {
    let text = document.getElementById('title').value;
    console.log(text);
    sendRequest(text).then( result => {
      if (result.Response == "True") {
        console.log(result);
        drawResult(result);
      } else {
        console.log("Not Found");
      }
    });
  }
}
