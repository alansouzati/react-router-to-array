function extractRoute (route, prefix) {
  const path = route.props && route.props.path ? route.props.path : route.path;
  if (!path) {
    return [];
  }
  const currentPath = (
    `${prefix || ''}${path.replace(/\//, '')}`
  );
  let paths = [];
  if (!/:|\*/.test(currentPath)) {
    paths.push(`${currentPath.startsWith('/') ? '' : '/'}${currentPath}`);

    const childRoutes = route.props && route.props.children ?
      route.props.children : route.childRoutes;
    if (childRoutes) {
      if (Array.isArray(childRoutes)) {
        childRoutes.forEach((r) => {
          paths = paths.concat(extractRoute(r, `${currentPath}/`));
        });
      } else {
        paths = paths.concat(extractRoute(childRoutes, `${currentPath}/`));
      }
    }
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
