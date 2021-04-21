
function drawNode(type, text, href) {
        let div = document.createElement("div");
        var a = document.createElement(type);
        a.classList.add("ns");

        // test = localStorage.getItem(href);
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
}

function clearNodes() {
  var x = document.getElementsByClassName("ns");
  // console.log("Clearnodes length of ns class elems: " + x.length);
  var len = x.length
  while(x[0]) {
    x[0].remove();
  }
}
