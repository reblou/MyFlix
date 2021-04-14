const {shell, ipcRenderer } = require('electron')


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

            // var path = "";
            // for(i = 0; i<curpath.length; i++) {
            //   path += curpath[i] + "\\";
            // }
            // var curnode = root.get(curpath.slice(0));
            //
            // parseName(link.getAttribute("data-filename"));
            //
            // path += link.getAttribute("data-filename");
            // console.log("Path: " + path);
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

function upButton() {
  console.log("UP!");
  var cur = root.get(curpath.slice(0));
  var pre = cur.parent;
  if (pre == undefined) {
    console.log("pre is undefined");
    return;
  }
  curpath.pop();
  drawNodes(pre);
}

function initialise(files) {
  let re = /video\/*/;

  root = new Node("Root", "");
  curpath = [];

  myfilelist = [];

  files.forEach((item, i) => {
    if (re.test(item.type)) {
      var spt = item.webkitRelativePath.split("/");
      //console.log(spt);
      root.add(item.path, spt);
      myfilelist.push(new MyFile(item.path, item.webkitRelativePath.split("/")));
    }
  });

  root = root.children[0];
  root.print(0);
  drawNodes(root);
  console.log(myfilelist);
  localStorage.setItem("files", JSON.stringify(myfilelist));
}


const submitListener = document
  .querySelector('form')
  .addEventListener('submit', (event) => {
      event.preventDefault()

      fp = document.getElementById('filePicker');
      const files = [...document.getElementById('filePicker').files]

      // localStorage.setItem("files", JSON.stringify(files));
      initialise(files);


  })

// recieves data from main when folder selected
ipcRenderer.on("test", (event, data) => {
  console.log("test from main recieved!");
});
