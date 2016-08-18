function extractChildRoutes (route, prefix) {
  let paths = [];
  const childRoutes = route.props && route.props.children ?
    route.props.children : route.childRoutes;
  if (childRoutes) {
    if (Array.isArray(childRoutes)) {
      childRoutes.forEach((r) => {
        paths = paths.concat(extractRoute(r, prefix));
      });
    } else {
      paths = paths.concat(extractRoute(childRoutes, prefix));
    }
  }
  return paths;
}

function extractRoute (route, prefix) {
  const path = route.props && route.props.path ? route.props.path : route.path;
  let paths = [];

  if (!path) {
    if (Array.isArray(route)) {
      route.forEach((r) => {
        paths = paths.concat(extractRoute(r, prefix));
      });

      return paths;
    } else {
      return extractChildRoutes(route, prefix)
    }
  }
  const currentPath = (
    `${prefix || ''}${path.replace(/\//, '')}`
  );

  if (!/:|\*/.test(currentPath)) {
    paths.push(`${currentPath.startsWith('/') ? '' : '/'}${currentPath}`);
    paths = paths.concat(extractChildRoutes(route, `${currentPath}/`));
  }
  return paths;
}

export default (route) => {
  let paths = [];
  if (Array.isArray(route)) {
    route.forEach((r) => {
      paths = paths.concat(extractRoute(r));
    });
  } else {
    paths = paths.concat(extractRoute(route));
  }

  return paths;
};
