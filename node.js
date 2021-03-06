class Node {
  constructor(name, link) {
    this.children = [];
    this.name = name;
    this.link = link;
  }

  create(layer, path, name) {
    for(var i = 0; i < this.children.length; i++) {
      if (this.children[i].name == name) {
        return this.children[i];
      }
    }

    if(layer > 1) {
      //folder
      this.children.push(new Node(name, "javascript:;", this));
    } else if (layer == 1) {
      //file
      this.children.push(new Node(name, "file://" + path, this));
    }

    //all nodes go to details page
    // this.children.push(new Node(name, "details.html"))
    // this.children.push(new Node(name, "javascript:;"))
    // this.children.push(new Node(name, "file://" + path, this));
    return this.children[this.children.length-1];
  }

  add(path, nlist) {
    var layer = nlist.length;
    if (layer > 0) {
      var n = this.create(layer, path, nlist.shift())

      n.add(path, nlist)
    }
  }


  print(depth) {
    var prefix = "";
    for (var i = 0; i<depth; i++) {
      prefix += " ";
    }


    console.log(prefix + this.name);
    this.children.forEach((item, i) => {
      item.print(depth+1);
    });
  }

  get(path) {
    if (path.length < 1) return this;

    var n = path.shift();
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name == n) {
        return this.children[i].get(path);
      }
    }
    console.log("error couldn't find: " + n);
    return -1;
  }

  // get child node from name
  getChild(name) {
    console.log("Get Child")
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].name === name) return this.children[i];
    }
    console.log("Error couldn't find child " + name);
    return null

  }

  getnodelist(array) {
    array.push(this);
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].getnodelist(array);
    }
    return array;
  }
}
