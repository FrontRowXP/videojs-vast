import videojs from 'video.js';
import './index';

/**
 * Search a param value in the current query string
 */
const getURLParameter = (param) => {
  const result = window.location.search.match(new RegExp(`(\\?|&)${param}(\\[\\])?=([^&]*)`));
  return result ? decodeURIComponent(result[3]) : undefined;
};
globalThis.getURLParameter = getURLParameter;
globalThis.adsPlugin = videojs('my-video', { autoplay: false, muted: true }).vast({
  vastUrl: getURLParameter('vastUrl'),
  vmapUrl: getURLParameter('vmapUrl'),
  skipButtonOptions: {
    text: 'Skip',
    inlineStyle: 'font-size:12px; font-family: sans-serif;',
    resetStyle: false,
  },
  debug: false,
});
window.log = (message) => { document.querySelector('#console').textContent = JSON.stringify(message, null, 2); };
