'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function extractRoute(route, prefix) {
  var path = route.props && route.props.path ? route.props.path : route.path;
  var paths = [];

  if (!path) {
    if (Array.isArray(route)) {
      route.forEach(function (r) {
        paths = paths.concat(extractRoute(r, prefix));
      });

      return paths;
    } else {
      return [];
    }
  }
  var currentPath = '' + (prefix || '') + path.replace(/\//, '');

  if (!/:|\*/.test(currentPath)) {
    paths.push('' + (currentPath.startsWith('/') ? '' : '/') + currentPath);

    var childRoutes = route.props && route.props.children ? route.props.children : route.childRoutes;
    if (childRoutes) {
      if (Array.isArray(childRoutes)) {
        childRoutes.forEach(function (r) {
          paths = paths.concat(extractRoute(r, currentPath + '/'));
        });
      } else {
        paths = paths.concat(extractRoute(childRoutes, currentPath + '/'));
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