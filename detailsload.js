const {ipcRenderer, shell} = require('electron')

function back() {
ipcRenderer.send("goBack", 'sendData');
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

myroot = new Node("Root", "");
myfiles.forEach((item) => {
  spt = item.split.slice();
  myroot.add(item.path, spt);
});

myroot.print(0);

drawNodesRec(myroot, "nd");
listeners(document.querySelectorAll('a'));
