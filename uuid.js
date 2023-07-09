function idGenerator() {
  let text = "";
  var stringraw =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++) {
    text += stringraw.charAt(Math.floor(Math.random() * stringraw.length));
  }
  return text;
}

function idCreate() {
  return idGenerator();
}
