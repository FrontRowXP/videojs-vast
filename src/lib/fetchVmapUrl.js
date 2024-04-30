import VMAP from '@dailymotion/vmap';

export const fetchVmapUrl = (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        let xmlDoc;
        if (!xhr.responseXML) {
          const parser = new DOMParser();
          xmlDoc = parser.parseFromString(xhr.responseText, 'text/xml');
        } else {
          xmlDoc = xhr.responseXML;
        }

        // Get a parsed VMAP object
        const vmap = new VMAP(xmlDoc);
        resolve(vmap);
      } else {
        reject(new Error('Error'));
      }
    }
  };
});
