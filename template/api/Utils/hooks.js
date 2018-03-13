let hookCallback;

function hooks(...args) {
  return hookCallback.apply(null, ...args);
}

function setHookCallback(callback) {
  hookCallback = callback;
}

export { hooks, setHookCallback };
