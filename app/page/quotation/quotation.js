// app/page/quotation/quotation.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isOpenMyShop: false, // 是否开店
		editorFlag: false, // 是否是债券编辑入口
		sendQuoteData: {}, // 发布报价参数
	},

	openMyShop: function () {
		this.setData({
			isOpenMyShop: true
		})
	},

	handleSendQuote () { // 发布报价

		console.log(this.data.sendQuoteData)
		wx.showToast({
			title: '发布报价成功！',
			icon: 'success',
			duration: 2000
		})
	},

	_changeValue: function (e) { // 获取发布报价参数
		this.setData({
			sendQuoteData: e.detail
		})
		// console.log('_changeValue....', e.detail)
	},

	handleShowToast: function () {
		this.toastedit = this.selectComponent('#toastedit')
		this.toastedit.showToast('显示这个哈哈哈哈哈', 2000)
	},
	showDialog() {
		this.dialog = this.selectComponent('#dialog')
		this.dialog.showDialog();
	},
	//取消事件
	_cancelEvent() {
		console.log('你点击了取消');
		this.dialog = this.selectComponent('#dialog')
		this.dialog.hideDialog();
	},
	//确认事件
	_confirmEvent() {
		console.log('你点击了确定');
		this.dialog = this.selectComponent('#dialog')
		this.dialog.hideDialog();
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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