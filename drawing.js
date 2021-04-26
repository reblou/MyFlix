// Clears nodes of a certain class
function clearNodes(cls) {
  var x = document.getElementsByClassName(cls);
  // console.log("Clearnodes length of ns class elems: " + x.length);
  var len = x.length
  while(x[0]) {
    x[0].remove();
  }
}


function drawNodeMain(text, href) {
  let div = document.createElement("div");
  var a = document.createElement("a");
  a.classList.add("ns");
  div.classList.add("ns-div");

  // test = localStorage.getItem(href);
  // console.log("test: " + test);
  if (localStorage.getItem(href)) {
    a.classList.add("ns-watched");
  }

  let img = localStorage.getItem("poster");
  // a.style.backgroundImage  = "url(" + img + ")";

  let link = document.createTextNode(parseName(text));

  a.appendChild(link);
  a.setAttribute("data-filename", text);

  // a.href = "file://" + item.path;
  a.href = href;
  div.appendChild(a);
  // document.body.appendChild(div);
  document.getElementById("ns-container").appendChild(div);
}

//draws nodes for main
function drawNodesMain(node, cls) {
  clearNodes(cls);
  node.children.forEach(item => {
    drawNodeMain(item.name, item.link);
  });
}

function drawNodeDetails(text, href, depth) {
  let div = document.createElement("div");
  var a = document.createElement("a");
  a.classList.add("nd");
  div.classList.add("nd-div");

  // test = localStorage.getItem(href);
  // console.log("test: " + test);
  if (localStorage.getItem(href)) {
    a.classList.add("nd-watched");
    // console.log("is watched.");
  }

  link = document.createTextNode(text);
  a.appendChild(link);
  a.setAttribute("data-filename", text);

  var padding = 20 * depth;
  a.style.padding = "0px 0px 0px "+ padding + "px";

  a.href = href;
  div.appendChild(a);
  document.getElementById("nd-container").appendChild(div);
}


// Draws nodes for details page
function drawNodesDetails(node, cls) {
  clearNodes(cls);
  node.children.forEach(item => {
    drawNodeDetails(item.name, item.link,0);
    drawChildren(item, cls, 1);
  });
}

function drawChildren(node, cls, depth) {
  node.children.forEach(item => {
    drawNodeDetails(item.name, item.link, depth);
    drawChildren(item, cls, depth+1);
  });

}
