function drawNodes(type, text, href) {
        let div = document.createElement("div");
        var a = document.createElement(type);
        var link = document.createTextNode(text);
        a.appendChild(link);

        // a.href = "file://" + item.path;
        a.href = href;
        div.appendChild(a);
        document.body.appendChild(div);
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

          // let div = document.createElement("div");
          // var a = document.createElement("a");
          // var link = document.createTextNode(item.name);
          // a.appendChild(link);
          //
          // a.href = "file://" + item.path;
          // div.appendChild(a);
          // document.body.appendChild(div);

          var spt = item.webkitRelativePath.split("/");
          //console.log(spt);

          root.add(spt);

        }
      });

      root.print(0);

      root.children[0].children.forEach(item => {
        drawNodes("a", item.name, "javascript:;");
      });

      const links = document.querySelectorAll('a')

      links.forEach((link) => {
        const url = link.getAttribute('href');
        if (url == "javascript:;") {
          //for folder clicks
          link.addEventListener('click', (e) => {
            console.log("null click");
            let div = document.createElement("div");
            var p = document.createElement("p");
            p.appendChild(document.createTextNode("Testing...."));
            div.appendChild(p);
            document.body.appendChild(div);
          });
        } else if (url.indexOf('file://') === 0) {
          link.addEventListener('click', (e) => {
            console.log("file click");
            e.preventDefault()
            shell.openExternal(url)
          });
        }
      });

  })
