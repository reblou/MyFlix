class Node {
  contructor(name, link) {
    this.name = name;
    this.link = link;
    children = []
  }

  get(name) {
    children.forEach((item, i) => {
      if (item.name == name) {
        return children[i]
      }
    });

    children.push(new Node(name, ""))
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

      files.forEach((item, i) => {
        if (re.test(item.type)) {
          console.log(item)

          let div = document.createElement("div");
          var a = document.createElement("a");
          var link = document.createTextNode(item.name);

          a.appendChild(link);

          a.href = "file://" + item.path;
          div.appendChild(a);
          document.body.appendChild(div)

        }
      });

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
