const {shell, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')


function addListeners(links) {
  links.forEach((link) => {
        const url = link.getAttribute('href');
        if (url == "javascript:;") {
          //for folder clicks
          link.addEventListener('click', (e) => {
            var s = link.innerHTML;
            var fn = link.getAttribute("data-filename");
            console.log("folder click fn: " + fn);
            curpath.push(fn);

            var next = root.get(curpath.slice(0));
            drawNodes(next);
            console.log("Curpath: ");
            for(i=0; i<curpath.length; i++) {
              console.log(curpath[i]);
            }
          });
        } else if (url.indexOf('file://') === 0) {
          //for file clicks
          link.addEventListener('click', (e) => {
            console.log("Trying to open: " + url);
            e.preventDefault()
            shell.openExternal(url)

            localStorage.setItem(url, true);
            console.log("storage url set true");
          });
        }
    });
}

function drawNode(type, text, href) {
        let div = document.createElement("div");
        var a = document.createElement(type);
        a.classList.add("ns");

        test = localStorage.getItem(href);
        // console.log("test: " + test);
        if (localStorage.getItem(href)) {
          a.classList.add("ns-watched");
          // console.log("is watched.");
        }

        var link = document.createTextNode(parseName(text));
        a.appendChild(link);
        a.setAttribute("data-filename", text);

        // a.href = "file://" + item.path;
        a.href = href;
        div.appendChild(a);
        document.body.appendChild(div);
}

function drawNodes(node) {
  clearNodes();
  node.children.forEach(item => {
    drawNode("a", item.name, item.link);
  });

  var links = document.querySelectorAll('a');
  addListeners(links);
}

function clearNodes() {
  var x = document.getElementsByClassName("ns");
  // console.log("Clearnodes length of ns class elems: " + x.length);
  var len = x.length
  while(x[0]) {
    x[0].remove();
  }
}


// takes list of myfile objs, turns into nodes and draws
function initialise(myfileslist) {
  root = new Node("Root", "");
  curpath = [];

  myfileslist.forEach((item) => {
    spt = item.split.slice();
    root.add(item.path, spt);
  });

  root.print(0);
  drawNodes(root);
  console.log(myfileslist);
  localStorage.setItem("files", JSON.stringify(myfileslist));
}

function isVideoFormat(name) {
  videoexts = ['.mkv', '.mp4', '.avi', '.mov', '.webm'];

  ext = path.extname(name);
  console.log("name: " + name);
  console.log("ext = " + ext);

  if(videoexts.indexOf(ext) >= 0) return true;
  return false;

}

// recieves data from main when folder selected
ipcRenderer.on("RootFolder", (event, data) => {
  console.log("folder from main recieved!" + data);
  myfilelist = [];

  // gets list of dirent objects
  fs.readdir(data, {withFileTypes: true}, (err, files) => {
    files.forEach((item) => {

      abspath = data + '\\' + item.name
      split = [item.name];

        if (item.isDirectory() || isVideoFormat(item.name)) {
        myfilelist.push(new MyFile(abspath, split));
      }
    });

    initialise(myfilelist)

  });
});
