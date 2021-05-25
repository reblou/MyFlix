const {ipcRenderer, shell} = require('electron')


function back() {
  ipcRenderer.send("goBack");
}

function update() {
  // window.open("updateform.html", "Update Form", "width=700, height=500");
  ipcRenderer.send("openUpdateWindow", localStorage.getItem("detailsName"));
}

function removeDetails() {
  let name = localStorage.getItem("detailsName");
  localStorage.removeItem(name + "-backdrop");
  localStorage.removeItem(name + "-poster");

  draw();
}

// adds listener to open all links externally in video player
function listeners(links) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      // var filename = link.getAttribute("data-filename");
      var url = link.getAttribute("href");

      if(url.indexOf('file://') == 0) {
        e.preventDefault();
        shell.openExternal(url)
        localStorage.setItem(url, true);
        link.classList.add("nd-watched");
      }
    });
  });
}

function draw() {
  let name = localStorage.getItem("detailsName");
  document.getElementById("header").innerHTML = name;
  myfiles = JSON.parse(localStorage.getItem("detailsMyFiles"))

  let root = new Node("Root", "");
  myfiles.forEach((item) => {
    spt = item.split.slice();
    root.add(item.path, spt);
  });

  let backdrop_path = localStorage.getItem(name + "-backdrop");
  let backdrop_div = document.getElementById("backdrop-div");
  if (backdrop_path !== null) {
    console.log("setting backdrop");
    backdrop_div.style.backgroundImage = "url(" + backdrop_path + ")";
    backdrop_div.classList.add("has-backdrop");
  } else {
    backdrop_div.classList.remove("has-backdrop");
    backdrop_div.style.backgroundImage = "";
    document.getElementById("info-div").classList.remove("has-backdrop");
  }

  // sets poster
  let poster_src = localStorage.getItem(name + "-poster");
  let poster = document.getElementById("poster");
  if (poster_src !== null) {
    console.log("setting poster");
    poster.src = poster_src;
    poster.classList.add("has-poster");
  } else {
    poster.src = "";
    poster.classList.remove("has-poster");
  }

  let plotp = document.getElementById("plot");
  plotp.innerHTML = localStorage.getItem(name + "-plot");

  drawNodesDetails(root, "nd");
  listeners(document.querySelectorAll('a'));
}

draw();


ipcRenderer.on("redraw", (event) => {
  console.log("redraw event");
  draw();
});
