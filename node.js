class Node {
  constructor(name, link, parent) {
    this.children = [];
    this.name = name;
    this.link = link;
    this.parent = parent;
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


    console.log(prefix + this.name + "(" + this.link + ")");
    this.children.forEach((item, i) => {
      item.print(depth+1);
    });
  }
}
