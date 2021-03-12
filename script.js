function addListeners(links) {
  links.forEach((link) => {
        const url = link.getAttribute('href');
        if (url == "javascript:;") {
          //for folder clicks
          link.addEventListener('click', (e) => {
            var s = link.innerHTML;
            console.log("folder click s: " + s);
            curpath.push(s);

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

            var path = "";
            for(i = 0; i<curpath.length; i++) {
              path += curpath[i] + "\\";
            }
            var curnode = root.get(curpath.slice(0));
            //get child clicked on
            // root.children.forEach(item => {
            //   if (item.name == link.innerHTML) {
            //   //TODO: chang if change names for display
            //   }
            // });

            path += link.innerHTML;
            console.log("Path: " + path);
            localStorage.setItem(path, true);
          });
        }
    });
}

function drawNode(type, text, href) {
        let div = document.createElement("div");
        var a = document.createElement(type);
        a.classList.add("ns");
        var link = document.createTextNode(text);
        a.appendChild(link);

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
  console.log("Clearnodes length of ns class elems: " + x.length);
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

const {shell} = require('electron')

const submitListener = document
  .querySelector('form')
  .addEventListener('submit', (event) => {
      event.preventDefault()

      const files = [...document.getElementById('filePicker').files]
      let re = /video\/*/;

      root = new Node("Root", "");
      curpath = [];

      files.forEach((item, i) => {
        if (re.test(item.type)) {

          var spt = item.webkitRelativePath.split("/");
          //console.log(spt);

          root.add(item.path, spt);

        }
      });

      root = root.children[0];
      root.print(0);

      // root.children[0].children.forEach(item => {
      //   drawNodes("a", item.name, item.link);
      // });
      drawNodes(root);
  })
