fs = localStorage.getItem("files");
fsp = JSON.parse(fs);

root = new Node("Root", "");
curpath = [];
fsp.forEach((item, i) => {
  root.add(item.path, item.split);
});

root = root.children[0];
drawNodes(root);
