
function drawNode(type, text, href, cls, depth) {
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

        // var link = document.createTextNode(parseName(text));
        var link = document.createTextNode(text);
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
    drawNode("a", item.name, item.link, cls);
  });
}

function drawNodesRec(node, cls) {
  clearNodes(cls);
  node.children.forEach(item => {
    drawNode("a", item.name, item.link, cls);
    drawChildren(item, cls, 1);
  });
}

function drawChildren(node, cls, depth) {
  var prefix = "";
  // for (var i = 0; i<depth; i++) {
  //   prefix += "_";
  // }
  //TODO: data- attribute for depth to style?
  // depth argument to draw
  node.children.forEach(item => {
    console.log("name:" + prefix + item.name);
    drawNode("a", prefix + item.name, item.link, cls, depth);
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
