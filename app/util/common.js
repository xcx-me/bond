module.exports = {
	showFailedToast: function () {
		wx.showToast({
			title: '操作失败，请稍后再试',
			icon: 'none',
			mask: true,
			duration: 1000
		})
	}
}