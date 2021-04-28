async function sendRequest(title) {
  var key = config.MY_KEY;
  let t = title.replace(/^\s+/g, "");
  t = t.replace(/\s+$/g, "");
  t = t.replace(/\s+/g, "+");
  var url = "http://www.omdbapi.com/?apikey=" + key + "&t=" + t;
  // HOW TO SEARCH FOR AN EPISODE:
  // var url = "http://www.omdbapi.com/?apikey=" + key + "&t=" + t + "&Season=1&Episode=1";
  var response = await fetch(url);


  // console.log(response);
  // console.log(response.json());
  console.log("API searching: " + url);
  return response.json();
}
