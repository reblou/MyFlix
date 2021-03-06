// Clears nodes of a certain class
function clearNodes(cls) {
  var x = document.getElementsByClassName(cls);
  // console.log("Clearnodes length of ns class elems: " + x.length);
  while(x[0]) {
    x[0].remove();
  }
}


function drawNodeMain(text, href) {
  let div = document.createElement("div");
  var a = document.createElement("a");
  a.classList.add("ns");
  div.classList.add("ns-div");

  if (localStorage.getItem(href)) {
    a.classList.add("ns-watched");
  }

  let name = parseName(text);

  let img = localStorage.getItem(name + "-poster");
  if (img !== null) {
    a.style.backgroundImage  = "url(" + img + ")";
  } else {
    let link = document.createTextNode(name);
    a.appendChild(link);
  }


  a.setAttribute("data-filename", text);
  a.setAttribute("data-parsedName", name);

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
  let tr = document.createElement("tr");
  let atd = document.createElement("td");
  let btd = document.createElement("td");
  var a = document.createElement("a");

  a.classList.add("nd");

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

  let del = document.createElement("input");
  del.id = href;
  del.type = "image";
  del.src = "trash-fill.svg";
  del.classList.add("nd-div-button");

  atd.appendChild(a);
  btd.appendChild(del);
  atd.classList.add("nd-td");
  btd.classList.add("nd-td");

  tr.appendChild(atd);
  tr.appendChild(btd);
  tr.classList.add("nd-tr");
  document.getElementById("nd-table").appendChild(tr);

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
