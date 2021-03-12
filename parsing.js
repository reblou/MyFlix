function parseName(name) {
  let re = /([\(\[][^\)\]]*[\)\]])/g;
  let filere = /\.[\w]+/g;
  // a = name.matchAll(re);
  // console.log(a);
  parsed = name.replaceAll(re, "");
  parsed = parsed.replaceAll(filere, "");
  console.log(parsed);

  return parsed;
}
