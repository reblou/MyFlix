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
