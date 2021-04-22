
function drawNode(type, text, href, cls, depth, pretty) {
        let div = document.createElement("div");
        var a = document.createElement(type);
        a.classList.add(cls);
        div.classList.add(cls + "-div");

        // test = localStorage.getItem(href);
        // console.log("test: " + test);
        if (localStorage.getItem(href)) {
          a.classList.add(cls + "-watched");
          // console.log("is watched.");
        }

        var link;
        if (pretty) {
          link = document.createTextNode(parseName(text));
        } else {
          link = document.createTextNode(text);
        }
        a.appendChild(link);
        a.setAttribute("data-filename", text);
        var padding = 20 * depth;
        a.style.padding = "0px 0px 0px "+ padding + "px";

        // a.href = "file://" + item.path;
        a.href = href;
        div.appendChild(a);
        // document.body.appendChild(div);
        document.getElementById(cls + "-container").appendChild(div);

}

function drawNodes(node, cls) {
  clearNodes(cls);
  node.children.forEach(item => {
    drawNode("a", item.name, item.link, cls, 0, true);
  });
}

function drawNodesRec(node, cls) {
  clearNodes(cls);
  node.children.forEach(item => {
    drawNode("a", item.name, item.link, cls, 0, false);
    drawChildren(item, cls, 1);
  });
}

function drawChildren(node, cls, depth) {
  node.children.forEach(item => {
    drawNode("a", item.name, item.link, cls, depth, false);
    drawChildren(item, cls, depth+1);
  });

}

function clearNodes(cls) {
  var x = document.getElementsByClassName(cls);
  // console.log("Clearnodes length of ns class elems: " + x.length);
  var len = x.length
  while(x[0]) {
    x[0].remove();
  }
}
