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
          var filename = link.getAttribute("data-filename")
          localStorage.setItem('detailsName', link.getAttribute("data-parsedName"));
          // localStorage.setItem('detailsName', filename);
          abpth = rootDir + "\\" + filename

          var files;
          var myfiles;
          if(fs.lstatSync(abpth).isDirectory()) {
            files = nodedir.files(abpth, {sync:true});
            // console.log(files);
            myfiles = filesToMyFiles(abpth, files);
          } else {
            var split = filename.split("\\");

            myfiles = [new MyFile(abpth, split)];
          }
          // console.log(myfiles)
          json = JSON.stringify(myfiles);
          localStorage.setItem("detailsMyFiles", json);
        });
    });
}

// takes list of myfile objs, turns into nodes and draws
function initialise(myfileslist) {
  let root = new Node("Root", "");
  rootDir = localStorage.getItem("rootdir");

  //TODO: check if null
  myfileslist.forEach((item) => {
    spt = item.split.slice();
    root.add(item.path, spt);
  });

  drawNodesMain(root, "ns");
  var links = document.querySelectorAll('a');
  addListeners(links);
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

ipcRenderer.on("API", (event) => {
  var links = document.querySelectorAll('a');
  let proms = sendRequests(links);
  // console.log(proms);
  Promise.all(proms).then(results => {
    console.log("all complete");
    console.log(results);

    let files = localStorage.getItem("files");
    let fsp = JSON.parse(files);
    initialise(fsp);

  })
});
