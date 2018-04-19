module.exports = {
	showFailedToast: function (title) {
		wx.showToast({
			title: title || '操作失败，请稍后再试',
			icon: 'none',
			mask: true,
			duration: 1500
		})
	},
	
	showToast: function (title, icon='none', duration=1500) { // icon有效值 'success', 'loading', 'none'
		wx.showToast({
			title: title,
			icon: icon,
			duration: duration
		})
	}
}