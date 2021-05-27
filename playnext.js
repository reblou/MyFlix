const fs = require('fs');

function searchNext(node, next, rootdir) {
  // console.log("searchNext(" + next  + " : " + rootdir + ")");

  for(var i = 0; i< node.children.length; i++) {

    let filename = node.children[i].name;
    let abspath = rootdir + "\\" + filename;
    if (!fs.lstatSync(abspath).isDirectory()) {
      // console.log(abspath);
      if (next > 0) {
        // console.log("next > 0");
        next -= 1;
      } else {
        return node.children[i].link
      }

    }

    let res = searchNext(node.children[i], next, abspath);
    if (res !== -1) {
      return res;
    }
  }
  // node.children.forEach((item, i) => {
  // });

  return -1;

}

function playNext(title, root, rootdir) {
  let num = parseInt(localStorage.getItem(title + "-next"));
  if (num === null) {
    num = 0;
  }

  let path = searchNext(root, num, rootdir);
  if (path !== -1) {
    console.log("play:" + path);
    num += 1
    localStorage.setItem(title + "-next", num);
    localStorage.setItem(path, true);
    shell.openExternal(path);
  } else {
    localStorage.setItem(title + "-next", 0)
    playNext(title, root, rootdir);
  }
}
