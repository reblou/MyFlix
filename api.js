async function sendRequest(title) {
  let key = config.TMDb_KEY;

  let t = title.replace(/\s+/g, "+");
  let url = "https://api.themoviedb.org/3/search/multi?api_key=" + key + "&query=" + t;

  // console.log("API searching: " + url);
  var response = await fetch(url);

  return response.json();
}

async function getConfig() {
  let key = config.TMDb_KEY;
  let url = "https://api.themoviedb.org/3/configuration?api_key=" + key;

  let response = await fetch(url);

  return response.json();
}

function getImageFullUrl(imgfp) {
  let base = localStorage.getItem("base_url");
  let size = localStorage.getItem("poster_max_size");

  return base + size + imgfp;
}

function saveImagePath(title, suffix, poster_path) {
  localStorage.setItem(title + "-" + suffix, getImageFullUrl(poster_path));
}

function sendRequests(links) {
  let promises = [];
  links.forEach((item) => {
    // let title = item.innerHTML;
    let title = item.getAttribute("data-parsedName");
    // Removes trailing and starting whitespace
    let t = title.replace(/^\s+/g, "");
    t = t.replace(/\s+$/g, "");


    let p = sendRequest(t);
    promises.push(p);
    p.then(result => {
      console.log(result);
      if (result.total_results > 0) {
        let first = result.results[0];
        if (localStorage.getItem(title + "-poster") === null) {
          localStorage.setItem(title + "-poster", getImageFullUrl(first.poster_path));
        }

        // if (localStorage.getItem(title + "-backdrop") === null) {
        //   localStorage.setItem(title + "-backdrop", getImageFullUrl(first.backdrop_path));
        // }

        if (first.backdrop_path !== null && localStorage.getItem(title + "-backdrop") === null) {
          console.log(first.backdrop_path + " = not null")
          localStorage.setItem(title + "-backdrop", getImageFullUrl(first.backdrop_path));
        }
      }
    });
  });

  //TODO: cache config
  getConfig().then(config => {
    let poster_sizes = config.images.poster_sizes;
    let backdrop_sizes = config.images.backdrop_sizes;

    localStorage.setItem("base_url", config.images.base_url);
    localStorage.setItem("poster_max_size", poster_sizes[poster_sizes.length-1]);
    localStorage.setItem("backdrop_max_size", backdrop_sizes[backdrop_sizes.length-1]);
    console.log("backdrop sizes");
    console.log(backdrop_sizes);
  });


  return promises;
}
