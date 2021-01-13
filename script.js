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

    var p = "";
    if (this.parent != undefined) {
      var p = this.parent.name;
    }

    console.log(prefix + this.name + "(parent: " + p + ")");
    this.children.forEach((item, i) => {
      item.print(depth+1);
    });
  }
}

const {shell} = require('electron')

const submitListener = document
  .querySelector('form')
  .addEventListener('submit', (event) => {
      //TODO: remove previous files in div

      event.preventDefault()

      const files = [...document.getElementById('filePicker').files]
      let re = /video\/*/;
      // files.sort(function(a, b) {
      //   return (a.webkitRelativePath < b.webkitRelativePath ? -1 : (a.webkitRelativePath > b.webkitRelativePath ? 1 : 0));
      // });

      var root = new Node("Root", "");

      files.forEach((item, i) => {
        if (re.test(item.type)) {
          // console.log(item)

          let div = document.createElement("div");
          var a = document.createElement("a");
          var link = document.createTextNode(item.name);
          a.appendChild(link);

          a.href = "file://" + item.path;
          div.appendChild(a);
          document.body.appendChild(div);

          var spt = item.webkitRelativePath.split("/");
          //console.log(spt);

          root.add(spt);

        }
      });


      root.print(0);

      const links = document.querySelectorAll('a[href]')

      Array.prototype.forEach.call(links, (link) => {
        const url = link.getAttribute('href')
        if (url.indexOf('file://') === 0) {
          link.addEventListener('click', (e) => {
            e.preventDefault()
            shell.openExternal(url)
          })
        }
      })

  })
