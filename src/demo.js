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
globalThis.adsPlugin = videojs('my-video', { autoplay: true, muted: true }).vast({
  // vastUrl: 'https://dev.frontrow.cc/channels/12884944665/VIDEO/236223295287/vast.xml',
  vmapUrl: 'https://dev.frontrow.cc/channels/12884944665/VIDEO/236223295287/vmap.xml',
  // vmapUrl: getURLParameter('vmapUrl'),
  skipButtonOptions: {
    text: 'Skip',
    inlineStyle: 'font-size:16px; font-family: serif; color: orange',
    resetStyle: false,
  },
  debug: false,
});
