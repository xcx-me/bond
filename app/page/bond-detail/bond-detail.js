// app/page/detail/detail.js
const service = require('../../util/service/service')
Page({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

	data: {
		bondId: '',
		uid: '',
		userId: '',
		from: '',
		isMyStore: false,
		isQtrade: false,
		currentTabId: 'detail',
		questionTotal: '0',
		vUrl: '../../asset/image/qtrade/sprites_01.png',
		winHeight: 0,
		tabIdList:['detail', 'question', 'store'],
		needUpdate: false
	},

	onSwitchTab: function (e) {
		let tabId = e.currentTarget.dataset.tid
		this.setData({
			currentTabId: tabId
		})
  	},

	getStoreDetail: function (uid) {
		service.getStoreDetail(uid, (result) => {
			let detail = result.data.retdata
			let isMyStore = String(detail.is_myself) === '1' && String(uid) === '0'
			this.setData({
				isMyStore: isMyStore,
				userId: detail.user_id
			})
		})
	},

  	getQuestionTotal: function () {
		service.getQuestionTotal(this.data.bondId, (result)=> {
			this.setData({
				questionTotal: result.data.retdata.ask_num
			})
		})
	},
	
	_updateQuestionTotalEvent: function (e) {
		let questionTotal =  e.detail
		this.setData({
			questionTotal: questionTotal
		})
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
	this.getStoreDetail(options.uid)
	this.getQuestionTotal()

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
		// 来自页面内转发按钮
		//console.log(ops.target)
		//console.log('buttton')
	  } else {
		  //console.log('onShareAppMessage.......')
	  }

	  let path = '/app/page/bond-detail/bond-detail?from=share&bid=' + this.data.bondId +'&uid=' + this.data.userId + '&tid=' + this.data.currentTabId
	  return {
		title: 'Qtrade一级债小程序',
		desc: 'desc....',
		path: path,
		success: function (res) {
		  // 转发成功
		  //console.log("转发成功:" + JSON.stringify(res));
		},
		fail: function (res) {
		  // 转发失败
		  // console.log("转发失败:" + JSON.stringify(res));
		}
	  }
  }
})