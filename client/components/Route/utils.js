const instances = [];
/**
 * Register new Route class
 * @param  {ReactClass} route
 * @return {void}
 */
export const register = route => instances.push(route);
/**
 * Undegister Route class
 * @param  {ReactClass} route
 * @return {void}
 */
export const unregister = route => instances.splice(instances.indexOf(route), 1);

/**
 * Change application path
 * @param  {string}
 * @return {void}
 */
export const historyPush = (path) => {
  window.history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

/**
 * Check current path with router path
 * @param  {string} currentPath
 * @param  {Object} options
 * @return {Object}
 */
export const matchPath = (currentPath, routePath) => {
  if (routePath === '/' && !currentPath) {
    return {
      path: routePath,
      url: '/',
    };
  }
  const match = new RegExp(`^#${routePath}`).exec(currentPath);
  if (!match) {
    // There wasn't a match.
    return null;
  }
  const url = match[0];
  return {
    path: routePath,
    url,
  };
};
