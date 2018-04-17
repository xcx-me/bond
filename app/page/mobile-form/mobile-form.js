// app/page/mobile-form/mobile-form.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [
			{
				fieldName: 'mobileNumber',
				label: '手机号',
				value: '',
				placeholder: '输入手机号',
				maxlength: 11
			},
			{
				fieldName: 'mobileValidationCode',
				label: '验证码',
				value: '3333',
				placeholder: '输入验证码',
				maxlength: 4
			},
		]
	},

	onChangeDescriptors: function (e) {
		this.setData({
			descriptors: e.detail.descriptors
		})
	},

	getMobileValidationCode: function () {
		console.log('get code...')
	},

	doSubmit: function () {
		console.log('do submit...')
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