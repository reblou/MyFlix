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

// async function sendRequest(title) {
//   var key = config.MY_KEY;
//   let t = title.replace(/^\s+/g, "");
//   t = t.replace(/\s+$/g, "");
//   t = t.replace(/\s+/g, "+");
//   var url = "http://www.omdbapi.com/?apikey=" + key + "&t=" + t;
//   var response = await fetch(url);
//
//
//   // console.log(response);
//   // console.log(response.json());
//   console.log("API searching: " + url);
//   return response.json();
// }

function sendRequests(links) {
  let promises = [];
  links.forEach((item) => {
    let title = item.innerHTML;
    // Removes trailing and starting whitespace
    let t = title.replace(/^\s+/g, "");
    t = t.replace(/\s+$/g, "");


    let p = sendRequest(t);
    promises.push(p);
    p.then(result => {
      console.log(result);
      // if results
      if (result.total_results > 0) {
        let first = result.results[0];

          localStorage.setItem(title, getImageFullUrl(first.poster_path));
      }
      // if (result.Response == "True") {
      //   // console.log(result);
      //   // console.log("storing: " + title);
      // }
    });


  });

  //TODO: cache config
  getConfig().then(config => {
    let poster_sizes = config.images.poster_sizes;
    let backdrop_sizes = config.images.backdrop_sizes;

    localStorage.setItem("base_url", config.images.base_url);
    localStorage.setItem("poster_max_size", poster_sizes[poster_sizes.length-1]);
    localStorage.setItem("backdrop_max_size", backdrop_sizes[backdrop_sizes.length-1]);
  });


  return promises;
}

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
