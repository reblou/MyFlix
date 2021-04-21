const {ipcRenderer, shell} = require('electron')

function back() {
ipcRenderer.send("goBack", 'sendData');
}

// adds listener to open all links externally in video player
function listeners(links) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      var filename = link.getAttribute("data-filename");
      var url = link.getAttribute("href");
      e.preventDefault();
      shell.openExternal(url)
      localStorage.setItem(url, true);
    });
  });
}

name = localStorage.getItem("detailsName");
document.getElementById("header").innerHTML = name;
myfiles = JSON.parse(localStorage.getItem("detailsMyFiles"))
console.log(myfiles);

root = new Node("Root", "");
myfiles.forEach((item) => {
  spt = item.split.slice();
  root.add(item.path, spt);
});

root.print(0);

//TODO: not recursive
drawNodesRec(root, "nd");
listeners(document.querySelectorAll('a'));
