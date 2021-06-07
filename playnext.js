const fs = require('fs');

function searchNext(node, next, rootdir) {
  // console.log("searching:");
  // console.log("next: " + next);
  // console.log("node: " + node.name);
  // console.log("rootdir: " + rootdir);
  for(var i = 0; i< node.children.length; i++) {

    let filename = node.children[i].name;
    let abspath = rootdir + "\\" + filename;
    if (!fs.lstatSync(abspath).isDirectory()) {
      // console.log("Not dir: " + filename);
      if (next > 0) {
        // console.log(next + " > 0");
        next -= 1;
      } else {
        return node.children[i].link
      }

    }

    let res = searchNext(node.children[i], next, abspath);
    if (isNaN(res)) {
      return res;
    } else {
      next = res;
    }
  }
  // node.children.forEach((item, i) => {
  // });

  // console.log("not found, returning next");
  return next;
}

function playNext(title, root, rootdir) {
  let num = parseInt(localStorage.getItem(title + "-next"));
  if (isNaN(num)) {
    num = 0;
  }

  let path = searchNext(root, num, rootdir);
  if (isNaN(path)) {
    // console.log("play:" + path);
    num += 1;
    localStorage.setItem(title + "-next", num);
    localStorage.setItem(path, true);
    shell.openExternal(path);
  } else {
    // console.log("overflow");
    localStorage.setItem(title + "-next", 0)
    playNext(title, root, rootdir);
  }
}
