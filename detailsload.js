const {ipcRenderer} = require('electron')

function back() {
ipcRenderer.send("goBack", 'sendData');
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

root.children.forEach(item => {
  div = document.createElement("div");
  a = document.createElement("a");
  a.classList.add("nl");

  if (localStorage.getItem(item.link)) {
    a.classList.add("ns-watched");
  }

  link = document.createTextNode(parseName(item.name));
  a.appendChild(link);
  a.setAttribute("data-filename", item.name);

  //TODO: this is details.html because of node.js code
  //TODO: not recursive
  a.href = item.link;
  div.appendChild(a);
  document.body.appendChild(div);
});
