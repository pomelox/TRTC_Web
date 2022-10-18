const apiMap = [
  // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror',
  ],
  // WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  // Old WebKit (Safari 5.1)
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitfullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  // Mozilla
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror',
  ],
  // Microsoft
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError',
  ],
  // ios   webkitbeginfullscreen  webkitendfullscreen
];

// 这么写只是为了IDE能检测到这些属性
const FullscreenApi = {
  requestFullscreen: null,
  exitFullscreen: null,
  fullscreenElement: null,
  fullscreenEnabled: null,
  fullscreenchange: null,
  fullscreenerror: null,
};

const specApi = apiMap[0];
let browserApi;

// determine the supported set of functions
for (let i = 0; i < apiMap.length; i++) {
  // check for exitFullscreen function
  if (apiMap[i][1] in document) {
    browserApi = apiMap[i];
  }
}
// map the browser API names to the spec API names
if (browserApi) {
  for (let i = 0; i < browserApi.length; i++) {
    FullscreenApi[specApi[i]] = browserApi[i];
  }
}

const fullScreenBtn = document.getElementById('fullScreenBtn');

function toggleFullScreen() {
	if (!FullscreenApi.requestFullscreen) {
		// 不支持
    console.log('no support fullScreen');
		return;
	}
	const isFullScreen = document[FullscreenApi.fullscreenElement];
	if (!isFullScreen) {
    if (!playerContainer) {
      console.log('no playerContainer');
      return;
    }
    if (!playerContainer.firstElementChild) {
      console.log('no stream');
      return;
    }
    playerContainer.firstElementChild[FullscreenApi.requestFullscreen]();
  } else {
    document[FullscreenApi.exitFullscreen]();
  }
}

function initFullScreen() {
  if (!fullScreenBtn) {
    console.log('no fullScreenBtn');
    return;
  }

  if (!FullscreenApi.requestFullscreen) {
		// 不支持
    console.log('no support fullScreen');
    fullScreenBtn.style.display = 'none';
		return;
	}

  console.log('add fullScreen listener');
  fullScreenBtn.addEventListener('click', toggleFullScreen, false);
}
initFullScreen();
