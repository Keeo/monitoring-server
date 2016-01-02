export default function(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(source => {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}
