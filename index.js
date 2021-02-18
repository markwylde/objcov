const dot = require('dot-object');
const watches = new WeakMap();

function watch (object) {
  const touched = [];

  function createHandler (prefix) {
    return {
      get: function (target, property) {
        if (typeof target[property] === 'object') {
          return new Proxy(target[property], createHandler(prefix + property + '.'));
        }
        touched.push(prefix + property);
        return target[property];
      }
    };
  }

  const watchedObject = new Proxy(object, createHandler(''));

  watches.set(watchedObject, { object, touched });

  return watchedObject;
}

function check (watchedObject) {
  const { object, touched } = watches.get(watchedObject);
  const all = Object
    .keys(dot.dot(object))
    .map(key => {
      return key.replace(/\[/g, '.').replace(/\]/g, '');
    });

  const untouched = all.filter(key => {
    return !touched.includes(key);
  });

  return {
    touched,
    all,
    untouched,
    percentTouched: 1 - parseFloat(untouched.length / all.length, 2)
  };
}

module.exports = {
  watch,
  check
};
