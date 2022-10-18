/* eslint-disable*/
// -------document events--------

initInputValues();

const state = { url:window.location.href.split("?")[0] };
window.history.pushState(state,'', 'index.html');

// --------global variables----------
let sdkAppId;
let secretKey;
let roomId;

let userId;

let client;

TRTC.Logger.setLogLevel(TRTC.Logger.LogLevel.DEBUG);

// check current environment is supported TRTC or not
TRTC.checkSystemRequirements().then((checkResult) => {
	if (!checkResult.result) {
		console.log('checkResult', checkResult.result, 'checkDetail', checkResult.detail);
		alert('Your browser does not supported TRTC!');
		window.location.href = 'https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html';
	}
})


function initParams() {
	sdkAppId = parseInt(document.getElementById('sdkAppId').value);
	secretKey = document.getElementById('secretKey').value;
	roomId = parseInt(document.getElementById('roomId').value);
	userId = document.getElementById('userId').value;
	
	
	aegis.reportEvent({
		name: 'loaded',
		ext1: 'loaded-success',
		ext2: DEMOKEY,
		ext3: sdkAppId,
	});
	
	if (!(sdkAppId && secretKey && roomId && userId)) {
		if (window.lang_ === 'zh-cn') {
			alert('请检查参数 SDKAppId, secretKey, userId, roomId 是否输入正确！');
		} else if (window.lang_ === 'en') {
			alert('Please enter the correct SDKAppId, secretKey, userId, roomId！');
		}
		
		throw new Error('Please enter the correct SDKAppId, secretKey, userId, roomId');
	}
}

async function joinRoom() {
	initParams()
	client = new Client({sdkAppId, userId, roomId, secretKey});
	try {
		await client.join();
		reportSuccessEvent('joinRoom', sdkAppId)
		// 仅观看，不推流
	} catch (error) {
		console.log('joinRoom error', error);
		reportFailedEvent({
			name: 'joinRoom', // 必填
			sdkAppId,
			roomId,
			error
		})
	}
}

async function leaveRoom() {
	if (client) {
		try {
			await client.leave();
			reportSuccessEvent('leaveRoom', sdkAppId)
		} catch (error) {
			reportFailedEvent({
				name: 'leaveRoom', // 必填
				sdkAppId,
				roomId,
				error,
			})
		}
	}
}

consoleBtn.addEventListener('click', () => {
	window.vconsole = new VConsole();
});
joinBtn.addEventListener('click', joinRoom, false);
leaveBtn.addEventListener('click', leaveRoom, false);
