function parseName(name) {
  let re = /([\(\[][^\)\]]*[\)\]])/g;
  let filere = /\.[\w]+$/g;
  parsed = name.replaceAll(re, "");
  parsed = parsed.replaceAll(filere, "");

  return parsed;
}
