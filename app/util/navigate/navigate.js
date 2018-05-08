const { request } = require('../ajax/ajax')
const config = require('../ajax/config')
const Click = require('../click/click')
module.exports = {
	doAccumulateClick: function (uid, bondSimpleName) {
		request(config.NEW_BOND.accumulateClick, {user_id: uid, bond_simple_name: bondSimpleName})
	},

	toBondDetail: function (from, isMine, uid, bondId, bondSimpleName) {
		let virtualUid = isMine ? '0' : uid
		let url = '/app/page/bond-detail/bond-detail?bid=' + bondId +'&uid=' + virtualUid
		let that = this
		if (from === 'detail') {
			wx.redirectTo({
				url: url, 
				success: function (){
					that.doAccumulateClick(uid, bondSimpleName)
				},
				complete: function () {
					Click.enable()
				}
			})
		} else {
			wx.navigateTo({
				url: url,
				success: function (){
					that.doAccumulateClick(uid, bondSimpleName)
				},
				complete: function () {
					Click.enable()
				}
			})
		}
	},

	toBondDetailByShare: function (uid, bondId, tabId) {
		wx.navigateTo({
			complete: function () {
				Click.enable()
			},
			url: '/app/page/bond-detail/bond-detail?from=share&bid=' + bondId +'&uid=' + uid + '&tid=' + tabId
		})
	},

	toStoreByShare: function(uid) {
		wx.navigateTo({
			complete: function () {
				Click.enable()
			},
			url: '/app/page/store/store?from=share&uid=' + uid
		})
	}
}