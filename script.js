const {shell} = require('electron')



const submitListener = document
  .querySelector('form')
  .addEventListener('submit', (event) => {
      event.preventDefault()

      const files = [...document.getElementById('filePicker').files]
      let re = /video\/*/;

      let div = document.createElement("div");
      var a = document.createElement("a");
      var link = document.createTextNode("test");

      a.appendChild(link);

      a.href = "https://www.google.com";
      div.appendChild(a);
      document.body.appendChild(div)

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
