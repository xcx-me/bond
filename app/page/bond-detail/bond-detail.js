// app/page/detail/detail.js
const service = require('../../util/service/service')
Page({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

	data: {
		bondId: '',
		bondSimpleName: '',
		uid: '',
		userId: '',
		from: '',
		isMyStore: false,
		isQtrade: false,
		currentTabId: 'detail',
		questionTotal: '0',
		winHeight: 0,
		tabIdList:['detail', 'question', 'store'],
		needUpdate: false,
		isAsking: false,
		isAnswering: false,
		bondList: [],
		storeDetail: {},
		loadingDetail: true,
		loadingQuestion: true,
		loadingStoreDetail: true,
		loadingBondList: true,
		scrollTop: 0
	},

	bindChangeTab: function (e) {
		let currentTabId = e.detail.currentItemId
		this.setData({
			currentTabId: currentTabId,
			scrollTop: 0
		})
	},

	onSwitchTab: function (e) {
		let tabId = e.currentTarget.dataset.tid
		this.setData({
			currentTabId: tabId
		})
  	},

	initData: function(uid) {
		this.getStoreDetail(uid)
	},

	getStoreDetail: function (uid) {
		service.getStoreDetail(uid, (result) => {
			let detail = result.data.retdata
			let isMyStore = String(detail.is_myself) === '1' && String(uid) === '0'
			this.setData({
				isMyStore: isMyStore,
				userId: detail.user_id,
				storeDetail: detail,
				loadingStoreDetail: false,
				needUpdate: true
			})

			this.getQuestionTotal()
			this.getBondList()
		})
	},

  	getQuestionTotal: function () {
		service.getQuestionTotal(this.data.bondId, (result)=> {
			this.setData({
				questionTotal: result.data.retdata.ask_num > 99 ?  '99+' : result.data.retdata.ask_num,
				loadingQuestion: false
			})
		})
	},

	getBondList: function () {
		service.getBondList({
			bond_id: this.data.bondId,
			user_id: this.data.userId,
			offset: 0,
			limit: 3,
			type: this.data.isMyStore && this.data.uid === '0' ? 3 : 4
		}, (result) => {
			this.setData({
				loadingBondList: false,
				bondList: result.data.retdata.bond_list
			})
		})
	},

	clearStoreDetail: function() {
		this.setData({
			storeDetail: {}
		})
	},

	updateStoreDetail: function(userId) {
		service.getStoreDetail(userId, (result) => {
			this.setData({
				storeDetail: result.data.retdata
			})
		})
	},

	onUpdateQuestionTotalEvent: function (e) {
		let questionTotal =  e.detail
		this.setData({
			questionTotal: questionTotal > 99 ?  '99+' : questionTotal
		})
	},

	onGetBondSimpleNameEvent: function (e) {
		this.setData({
			loadingDetail: false,
			bondSimpleName: e.detail
		})
	},

	doShareStore: function (userId,bondSimpleName) {
		this.clearStoreDetail()
		service.doShareStore(userId,bondSimpleName, () => {
			this.updateStoreDetail(this.data.uid)
		}, () => {})	
	},
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.setData({
		bondId: options.bid,
		uid: options.uid,
		userId: options.uid,
		currentTabId: options.tid ? options.tid : 'detail',
		from: options.from || ''
	})

	this.initData(options.uid)

	var that = this; 
	wx.getSystemInfo({
		success: function(res) {
			that.setData({
				winHeight: res.windowHeight - (res.windowWidth / 750 * 80)
			})
		}
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
	if (ops.from === 'button') {
	} else {
	}

	let userId = this.data.userId
	let bondId = this.data.bondId
	let bondSimpleName = this.data.bondSimpleName
	let path = '/app/page/market/market?to=bond-detail&bid=' + this.data.bondId +'&uid=' + userId + '&tid=' + this.data.currentTabId
	let that = this
	return {
		title: `债券【${bondSimpleName}】最新信息`,
		desc: '介绍一个基于QQ的同业报价工具给你哦！事不宜迟，现在加入QTrade吧。',
		path: path,
		success: function (res) {
			that.doShareStore(userId, bondSimpleName)
		},
		fail: function (res) {
		}
	}
  }
})