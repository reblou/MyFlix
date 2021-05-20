const {ipcRenderer, shell} = require('electron')

function back() {
  ipcRenderer.send("goBack");
}

function update() {
  // window.open("updateform.html", "Update Form", "width=700, height=500");
  ipcRenderer.send("openUpdateWindow", name);
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

name = localStorage.getItem("detailsName");
document.getElementById("header").innerHTML = name;
myfiles = JSON.parse(localStorage.getItem("detailsMyFiles"))
console.log(myfiles);

let root = new Node("Root", "");
myfiles.forEach((item) => {
  spt = item.split.slice();
  root.add(item.path, spt);
});

root.print(0);

let backdrop_path = localStorage.getItem(name + "-backdrop");
if (backdrop_path !== null) {
  console.log("setting backdrop");
  document.getElementById("backdrop-div").style.backgroundImage = "url(" + backdrop_path + ")";
}

// sets poster
let poster = localStorage.getItem(name + "-poster");
if (poster !== null) {
  console.log("setting poster");
  document.getElementById("poster").src = poster;
}

drawNodesDetails(root, "nd");
listeners(document.querySelectorAll('a'));
