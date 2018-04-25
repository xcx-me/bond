const { request } = require('../ajax/ajax')
const config = require('../ajax/config')

module.exports = {
	doAccumulateClick: function (uid, bondSimpleName) {
		console.log('do doAccumulateClick....', uid, bondSimpleName)
		request(config.NEW_BOND.accumulateClick, {user_id: uid, bond_simple_name: bondSimpleName})
	},

	toBondDetail: function (from, isMine, uid, bondId, bondSimpleName) {
		console.log('toBondDetail...', from, isMine, uid, bondId, bondSimpleName)
		let virtualUid = isMine ? '0' : uid
		let url = '/app/page/bond-detail/bond-detail?bid=' + bondId +'&uid=' + virtualUid
		let that = this
		console.log('toBondDetail...', url)
		if (from === 'detail') {
			wx.redirectTo({
				url: url, 
				success: function (){
					that.doAccumulateClick(uid, bondSimpleName)
				}
			})
		} else {
			wx.navigateTo({
				url: url,
				success: function (){
					that.doAccumulateClick(uid, bondSimpleName)
				}
			})
		}
	},
}