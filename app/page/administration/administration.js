// app/page/administration/administration.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Page({
	data: {
		page: 0,
		pageSize: 15,
		winHeight: 0,
		bondList: [],
		loading: true
	},

	getBondList: function (page, len) {
		let offset = page * this.data.pageSize
		let limit = len < this.data.pageSize ? this.data.pageSize : len
		request(config.NEW_BOND.newBondList, {
			bond_id: '0',
			user_id: '0',
			offset: offset,
			limit: limit,
			type: 1
		}).then((result) => {
			console.log(result)
			this.setData({
				bondList: result.data.retdata.bond_list,
				loading: false
			})
		})
	},

	onModifyBond: function(e) {
		let index = e.currentTarget.dataset.index
		let bond = this.data.bondList[index]
		console.log('onModifyBond.....', bond)
	},

	onSeeMore: function (e) {
		let index = e.currentTarget.dataset.index
		let bond = this.data.bondList[index]
		let url = '../bond-detail/bond-detail?bid=' + bond.bond_id + '&uid=0'
		wx.navigateTo({
			url: url
		})
	},

	createQuotation: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// reg: 0 认证初始化阶段；1 已绑定手机；2 已提交资料；3 已输入验证码或点击激活邮件；4 已完成人工审核
			result = { 'ret': '0', 'retmsg': 'OK', 'retdata': { 'enable': true, 'v': false, 'reg': 0 } }

			if (!result.retdata.v) {
				wx.navigateTo({url: '../mobile-form/mobile-form'})
				return
			}

			// console.log('do register')
			wx.navigateTo({url: '../quotation/quotation'})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getBondList(0, this.data.pageSize)
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
		console.log(this.data.bondList)
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