// app/page/store/store.js
const service = require('../../util/service/service')
Page({
	properties: {	
		navigatorUrl: {
			type: String,
			value: ''
		}
	},

  	data: {
		uid: '',
		userId: '',
		userName: '',
		isMyStore: false,
		isQtrade: false,
		needUpdate: false,
		vUrl: '../../asset/image/qtrade/sprites_01.png',
		from: ''
  	},

	onUpdateStoreDetail: function (e) {
		let detail = e.detail
		let isMyStore = String(detail.is_myself) === '1' && String(this.data.uid) === '0'
		this.setData({
			isMyStore: isMyStore,
			isQtrade: String(detail.is_qtrade) === '1',
			userId: detail.user_id,
			userName: detail.sale_name
		})
	},

  	onLoad: function (options) {
		let uid = options.uid
		this.setData({
			uid: uid,
			from: options.from || ''
		})
  	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	// console.log('ready...', this.data.userId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  	onShow: function () {
		this.setData({
			needUpdate: true
		})

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

	doShareStore: function (userId) {
		service.doShareStore(userId, '', () => {}, () => {})
	},
  	/**
   	* 用户点击右上角分享
   	*/
  	onShareAppMessage: function (ops) {
		if (ops.from === 'button') {
			//
		} else {
			//
		}

		let userId = this.data.userId
		let path = '/app/page/market/market?to=store&uid=' + userId
		let that = this
		return {
			title: `${this.data.userName}的店铺`,
			desc: '介绍一个基于QQ的同业报价工具给你哦！事不宜迟，现在加入QTrade吧。',
			path: path,
			success: function (res) { // 确定
				that.doShareStore(userId)
			},
			fail: function (res) { // 取消
			}
		}
	}
})