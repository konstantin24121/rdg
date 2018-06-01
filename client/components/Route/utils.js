const instances = [];

export const register = route => instances.push(route);
export const unregister = route => instances.splice(instances.indexOf(route), 1);

export const historyPush = (path) => {
  window.history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

export const matchPath = (pathname, options) => {
  const { path } = options;
  const match = new RegExp(`^#${path}`).exec(pathname);
  if (!match) {
    // There wasn't a match.
    return null;
  }
  const url = match[0];
  return {
    path,
    url,
  };
};
