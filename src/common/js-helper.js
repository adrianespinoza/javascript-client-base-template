/**
 * List of supported browser versions.
 */
var getSupportedBrowsers = function () {
  'use strict';
  return {
    chrome: {
      pattern: /chrome/i,
      minVersion: 25
    },
    firefox: {
      pattern: /firefox/i,
      minVersion: 20
    },
    ie: {
      pattern: /ie/i,
      minVersion: 100
    }
  };
};

/**
 * Gets the type and version of browser.
 * @returns {string}
 */
var getBrowser = function () {
  'use strict';
  var userAgent = navigator.userAgent;
  var tempInfo, agentInfo = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  var browserInfo = {name: '', version: ''};

  // Parsing for IE browsers
  if (/trident/i.test(agentInfo[1])) {
    tempInfo = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
    browserInfo.name = 'IE';
    browserInfo.version = (tempInfo[1] || '');
    return browserInfo;
  }

  // Parsing for chrome and opera browsers
  if (agentInfo[1] === 'Chrome') {
    tempInfo = userAgent.match(/\bOPR\/(\d+)/);
    if (tempInfo !== null) {
      browserInfo.name = 'Opera';
      browserInfo.version = tempInfo[1];
      return browserInfo;
    }
  }

  agentInfo = agentInfo[2] ? [agentInfo[1], agentInfo[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tempInfo = userAgent.match(/version\/(\d+)/i);

  if (tempInfo !== null) {
    agentInfo.splice(1, 1, tempInfo[1]);
  }

  browserInfo.name = agentInfo[0];
  browserInfo.version = agentInfo[1];
  return browserInfo;
};

/**
 * Verify if url has unsupported.html string.
 * @param url
 * @returns {boolean}
 */
var isUnsupportedTemplate = function (url) {
  'use strict';
  return url.indexOf("unsupported.html") !== -1;
};

/**
 * Checks whether current browser is supported or not.
 * @returns {boolean}
 */
var checkSupportedBrowser = function () {
  'use strict';
//  var supportedBrowsers = {chrome: /chrome/i, firefox: /firefox/i, ie: /ie/i};
  var supportedBrowsers = getSupportedBrowsers();
  var browserName = getBrowser().name;
  var browserVersion = getBrowser().version;
  var url = document.URL.toString();
  var key;

  for (key in supportedBrowsers) {
    if (supportedBrowsers[key].pattern.test(browserName) && browserVersion >= supportedBrowsers[key].minVersion) {
      if (isUnsupportedTemplate(url)) {
        window.location = url.split('unsupported')[0];
      }
      return true;
    }
  }

  if (!isUnsupportedTemplate(url)) {
    window.location = document.URL.split('#')[0] + 'unsupported.html';
  } else {
    document.getElementById('ChromeBrowserMinimumVersion').innerHTML =
      'Version ' + supportedBrowsers.chrome.minVersion.toString() + '+';
    document.getElementById('FirefoxBrowserMinimumVersion').innerHTML =
      'Version ' + supportedBrowsers.firefox.minVersion.toString() + '+';
//    document.getElementById('IeBrowserMinimumVersion').innerHTML =
//      'Version: ' + supportedBrowsers.ie.minVersion.toString() + '+';
  }
  return false;
};