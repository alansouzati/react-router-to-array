'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function extractRoute(route, prefix) {
  var path = route.props && route.props.path ? route.props.path : route.path;
  if (!path) {
    return [];
  }
  var currentPath = '' + (prefix || '') + path.replace(/(\/)\w/g, '');
  var paths = [];
  if (!/:|\*/.test(currentPath)) {
    paths.push(currentPath);

    var childRoutes = route.props && route.props.children ? route.props.children : route.childRoutes;
    if (childRoutes) {
      if (Array.isArray(childRoutes)) {
        childRoutes.forEach(function (r) {
          paths = paths.concat(extractRoute(r, '' + currentPath + (currentPath !== '/' ? '/' : '')));
        });
      } else {
        paths = paths.concat(extractRoute(childRoutes, '' + currentPath + (currentPath !== '/' ? '/' : '')));
      }
    }
  }
  return paths;
}

exports.default = function (route) {
  var paths = [];
  if (Array.isArray(route)) {
    route.forEach(function (r) {
      paths = paths.concat(extractRoute(r));
    });
  } else {
    paths = paths.concat(extractRoute(route));
  }

  return paths;
};

module.exports = exports['default'];