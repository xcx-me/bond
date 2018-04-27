module.exports = {
	showFailedToast: function (title='操作失败，请稍后再试') {
		this.showToast(title)
	},
	showToast: function (title, icon='none', duration=1500) { // icon有效值 'success', 'loading', 'none'
		wx.showToast({
			title: title,
			icon: icon,
			duration: duration
		})
	}
}