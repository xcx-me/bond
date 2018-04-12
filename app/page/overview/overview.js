// app/page/overview/overview.js
const common = require('../../util/common.js')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
var app = getApp()

Page({
	data: {
		storeRegistered: false,
		checkboxItems: [{ name: 'isAgreedQtrade', value: '1', checked: 'true' }],
		isAgreedQtrade: true,
		dynamicList: [],
		userInfo: {
			faceUrl: '',
			userName: '',
			companyName: '',
			url: '',
			vUrl: ''
		},
		vUrl: '../../asset/image/qtrade/sprites_01.png',
		uid: '0',
		userId: '0',
		isQtrade: false,
		loading: true,
		needUpdate: false
	},

	isStoreOpened: function () {
		request(config.NEW_BOND.isStoreOpened, {}).then((result) => {
			if (String(result.data.ret) === '0') {
				// result.data.retdata.is_myshop_opened = 0
				this.setData({
					storeRegistered: String(result.data.retdata.is_myshop_opened) === '1',
					loading: false,
					needUpdate: true
				})
			}
		})
	},

	getCardInfo: function () {
		request(config.NEW_BOND.cardInfo, {}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					userInfo: {
						faceUrl: result.data.faceurl || '../../asset/image/qtrade/icon-default.png',
						isVUser: result.data.iscomfirmed,
						userName: result.data.realname,
						companyName: result.data.company.simpleName,
						url: '../my-configuration/my-configuration',
						vUrl: this.data.vUrl
					}
				})
			}
		})
	},

	checkboxChange: function (e) {
		this.setData({
			isAgreedQtrade: e.detail.value.length > 0
		})
	},

	toMyStore: function () {
	},

	doOpenStore: function() {
		request(config.NEW_BOND.openMyShop, {}).then((result) => {
			if(String(result.data.ret) === '0') {
				wx.navigateTo({
					url: '../register-store-complete/register-store-complete'
				})
			} else {
				common.showFailedToast()
			}
		}).catch(() => {
			common.showFailedToast()
		})
  	},

	  onUpdateStoreDetail: function (e) {
		  console.log('overview onUpdateStoreDetail...', e)
		let detail = e.detail
		let isMyStore = String(detail.is_myself) === '1' && String(this.data.uid) === '0'
		this.setData({
			isMyStore: isMyStore,
			isQtrade: String(detail.is_qtrade) === '1',
			userId: detail.user_id
		})
  },

	initData: function () {
		this.isStoreOpened()
		this.getCardInfo()
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
		this.initData()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({
			needUpdate: false
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