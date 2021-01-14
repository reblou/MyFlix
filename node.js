class Node {
  constructor(name, link, parent) {
    this.children = [];
    this.name = name;
    this.link = link;
    this.parent = parent;
  }

  get(name) {
    for(var i = 0; i < this.children.length; i++) {
      if (this.children[i].name == name) {
        return this.children[i];
      }
    }

    this.children.push(new Node(name, "", this));
    return this.children[this.children.length-1];
  }

  add(nlist) {
    if (nlist.length > 0) {
      var n = this.get(nlist.shift())

      n.add(nlist)
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
}
