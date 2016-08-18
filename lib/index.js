'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function extractChildRoutes(route, prefix) {
  var paths = [];
  var childRoutes = route.props && route.props.children ? route.props.children : route.childRoutes;
  if (childRoutes) {
    if (Array.isArray(childRoutes)) {
      childRoutes.forEach(function (r) {
        paths = paths.concat(extractRoute(r, prefix));
      });
    } else {
      paths = paths.concat(extractRoute(childRoutes, prefix));
    }
  }
  return paths;
}

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
      return extractChildRoutes(route, prefix);
    }
  }
  var currentPath = '' + (prefix || '') + path.replace(/\//, '');

  if (!/:|\*/.test(currentPath)) {
    paths.push('' + (currentPath.startsWith('/') ? '' : '/') + currentPath);
    paths = paths.concat(extractChildRoutes(route, currentPath + '/'));
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