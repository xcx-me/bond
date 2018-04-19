const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const service = require('../../util/service/service')

Page({
	data: {
		page: 0,
		pageSize: 15,
		winHeight: 0,
		isStoreRegistered: false,
		isShowModify: false,
		modifyBondSimpleName: '',
		loading: true,
		bondList: [],
	},

	getBondList: function (page, len) {
		let offset = page * this.data.pageSize
		let limit = len < this.data.pageSize ? this.data.pageSize : len
		service.getBondList({
			bond_id: '0',
			user_id: '0',
			offset: offset,
			limit: limit,
			type: 1
		}, (result) => {
			this.setData({
				isStoreRegistered: true,
				bondList: result.data.retdata.bond_list,
				loading: false
			})
		})
	},

	onModifyBondEvent: function(e) {
		let bname = e.detail
		this.data.modifyBondSimpleName = bname
		console.log('admin onModifyBond.....', bname)
		this.setData({
			isShowModify: true
		})
	},

	onDeleteBondEvent: function (e) {
		let bname = e.detail
		request(config.NEW_BOND.deleteBond, {
			bond_simple_name: bname
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.getBondList(0, this.data.bondList.length)
			}
		})
	},	

	createQuotation: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// reg: 0 认证初始化阶段；1 已绑定手机；2 已提交资料；3 已输入验证码或点击激活邮件；4 已完成人工审核
			result = { 'ret': '0', 'retmsg': 'OK', 'retdata': { 'enable': true, 'v': true, 'reg': 0 } }

			if (!result.retdata.v) {
				wx.navigateTo({url: '../mobile-form/mobile-form'})
				return
			}

			wx.navigateTo({url: '../quotation/quotation'})
		})
	},

	isStoreOpened: function () {
		service.isStoreOpened((result) => {
			// result.data.retdata.is_myshop_opened = '0' // for debug
			let isStoreRegistered = String(result.data.retdata.is_myshop_opened) === '1'
			if (isStoreRegistered) {
				wx.setNavigationBarTitle({
					title: 'QTrade一级债'
				})
				this.getBondList(0, this.data.pageSize)
			} else {
				wx.setNavigationBarTitle({
					title: '开店申请'
				})
				this.setData({
					isStoreRegistered: false,
					loading: false
				})
			}
		})
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
		this.isStoreOpened()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({
			isShowModify: false
		})
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