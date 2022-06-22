/**
 * Get url param
 * @param {string} q
 * @return {string}
 */
export function getParam(q) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(q) || "";
}

/**
 * Set url param without refreshing page
 * @param {string} name
 * @param {string} val
 * @return {void}
 */
export function setParam(name, val) {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set(name, val);
  var newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  window.history.pushState(null, "", newRelativePathQuery);
}
