const operationResults = {
	editComplete: {
		imagePath: '/app/asset/image/qtrade/success_186.svg',
		title: '修改成功',
		description: '',
		buttonLabel: '继续'
	},
	auditInProgress: {
		imagePath: '/app/asset/image/qtrade/wait_for_186.svg',
		title: '审核中',
		description: '您提交的资料正在审核中，请耐心等待',
		buttonLabel: '继续'
	},
	bindComplete: {
		imagePath: '/app/asset/image/qtrade/binding_success_186.svg',
		title: '绑定成功',
		description: '您在电脑端已认证，现已为您快速完成绑定',
		buttonLabel: '完成'
	},
	bindCompleteWithoutVerification: {
		imagePath: '/app/asset/image/qtrade/binding_success_186.svg',
		title: '绑定成功',
		description: '已为您快速绑定，请继续完成后续认证',
		buttonLabel: '完成'
	},
	submissionComplete: {
		imagePath: '/app/asset/image/qtrade/wait_for_186.svg',
		title: '提交成功',
		description: '我们将尽快为您完成审核',
		buttonLabel: '继续'
	}
}

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imagePath: {
			type: String,
			value: ''
		},
		title: {
			type: String,
			value: ''
		},
		description: {
			type: String,
			value: ''
		},
		buttonLabel: {
			type: String,
			value: ''
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let operationResult = operationResults[options.type]
		this.setData({
			imagePath: operationResult.imagePath,
			title: operationResult.title,
			description: operationResult.description,
			buttonLabel: operationResult.buttonLabel
		})

		wx.setNavigationBarTitle({
			title: operationResult.title
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})