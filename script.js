const {shell, ipcRenderer } = require('electron')
const fs = require('fs')
const path = require('path')
const nodedir = require('node-dir')

rootDir = ""

// turn list of filenames in root dir to myfileslist
function filesToMyFiles(root, files) {
  myfilelist = [];
  files.forEach((abspath) => {
    // + 1 to remove starting \
    relpath = abspath.substring(root.length + 1);

    split = relpath.split("\\");
    filename = split[split.length-1];
    if (isVideoFormat(filename)) {
      myfilelist.push(new MyFile(abspath, split))
    }
  });
  return myfilelist;
}

function addListeners(links) {
  links.forEach((link) => {
        link.href = "details.html"

        // set storage for each node for details page to use
        link.addEventListener('click', (e) => {
          localStorage.setItem('detailsName', link.innerHTML);
          var filename = link.getAttribute("data-filename")
          abpth = rootDir + "\\" + filename
          // console.log("path: " + abpth)

          var files;
          if(fs.lstatSync(abpth).isDirectory()) {
            files = nodedir.files(abpth, {sync:true});
            // console.log(files);
          } else {
            files = [abpth];
          }
          myfiles = filesToMyFiles(abpth, files);
          // console.log(myfiles)
          json = JSON.stringify(myfiles);
          localStorage.setItem("detailsMyFiles", json);
        });
    });
}

// function drawNode(type, text, href) {
//         let div = document.createElement("div");
//         var a = document.createElement(type);
//         a.classList.add("ns");
//
//         // test = localStorage.getItem(href);
//         // console.log("test: " + test);
//         if (localStorage.getItem(href)) {
//           a.classList.add("ns-watched");
//           // console.log("is watched.");
//         }
//
//         var link = document.createTextNode(parseName(text));
//         a.appendChild(link);
//         a.setAttribute("data-filename", text);
//
//         // a.href = "file://" + item.path;
//         a.href = href;
//         div.appendChild(a);
//         document.body.appendChild(div);
// }
//
// function drawNodes(node) {
//   clearNodes();
//   node.children.forEach(item => {
//     drawNode("a", item.name, item.link);
//   });
//
//   var links = document.querySelectorAll('a');
//   addListeners(links);
// }
//
// function clearNodes() {
//   var x = document.getElementsByClassName("ns");
//   // console.log("Clearnodes length of ns class elems: " + x.length);
//   var len = x.length
//   while(x[0]) {
//     x[0].remove();
//   }
// }
//

// takes list of myfile objs, turns into nodes and draws
function initialise(myfileslist) {
  root = new Node("Root", "");
  rootDir = localStorage.getItem("rootdir");

  myfileslist.forEach((item) => {
    spt = item.split.slice();
    root.add(item.path, spt);
  });

  root.print(0);
  drawNodes(root, "ns");
  var links = document.querySelectorAll('a');
  addListeners(links);
  console.log(myfileslist);
  localStorage.setItem("files", JSON.stringify(myfileslist));
}

function isVideoFormat(name) {
  videoexts = ['.mkv', '.mp4', '.avi', '.mov', '.webm'];

  ext = path.extname(name);

  if(videoexts.indexOf(ext) >= 0) return true;
  return false;

}

// recieves data from main when folder selected
ipcRenderer.on("RootFolder", (event, data) => {
  console.log("folder from main recieved!" + data);
  rootDir = data;
  localStorage.setItem("rootdir", data);
  myfilelist = [];

  console.log("node-dir output");
  nodedir.files(data, (err, files) => {
    if (err) throw err;
    initialise(filesToMyFiles(data, files));
  })
});
