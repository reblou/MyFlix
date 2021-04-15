files = localStorage.getItem("files");
fsp = JSON.parse(files);

root = new Node("Root", "");
curpath = [];
fsp.forEach((item, i) => {
  root.add(item.path, item.split);
});

drawNodes(root);
