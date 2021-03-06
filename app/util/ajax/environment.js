const PRODUCTION_DOMAIN = 'http://test.qtrade.com.cn' // Please change to 'https://www.qtrade.com.cn' when doing production release.
const APPLETREE_KEY = 'appletree_key'
const isLocalhost = false

// ===============================================================================

// const SERVER = {
// 	domain: 'https://www.qtrade.com.cn',
// 	cookie: 'appletree_key=4f8013da282f5df3a4e54cea339d82a9'
// }

// const SERVER = {
// 	domain: 'http://test.qtrade.com.cn',
// 	cookie: 'appletree_key=79500dc9a6909644eb19634500aef558aa5068bd' // sunqing
// }

const SERVER = {
	domain: 'http://test.qtrade.com.cn',
	cookie: 'appletree_key=1ffc0512f2e1538fe6b8ea3041454cb2a885b03b' //ritahuang
}

// const SERVER = {
// 	domain: 'http://192.168.1.203',
// 	cookie: 'appletree_key=0d9a11bc036bac8e5fed95c672e933a5641c541b'
// }

// const SERVER = {
// 	domain: 'http://test.qtrade.com.cn',
// 	cookie: 'appletree_key=daaca481c4c9183d337a4acb462946414c27cbb8' // Anthony
// }

function withDomain (path, domain) {
	if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) return path
	return `${domain}${path}`
}

function parseToUrl (url) {
	return withDomain(url, isLocalhost ? SERVER.domain : PRODUCTION_DOMAIN)
}

function parseCookieToString () {
	if (isLocalhost) {
		wx.setStorageSync(APPLETREE_KEY, SERVER.cookie.split('=')[1])
		return SERVER.cookie
	}
	return `${APPLETREE_KEY}=${wx.getStorageSync(APPLETREE_KEY)}`
}

module.exports = {
	APPLETREE_KEY: APPLETREE_KEY,
	parseToUrl: parseToUrl,
	parseCookieToString: parseCookieToString,
	isLocalhost: isLocalhost,
	withDomain: withDomain
}
