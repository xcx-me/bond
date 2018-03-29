// app/page/detail/detail.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
Page({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

	data: {
		bondId: '',
		uid: '',
		userId: '',
		isMyStore: false,
		isQtrade: false,
		selectBarName: 'info',
		questionTotal: '0',
		needUpdate: true,
		vUrl: '../../asset/image/qtrade/sprites_01.png'
	},

	doChangeTab: function (e) {
		if (e.currentTarget.dataset.name === 'question') {
			this.getQuestionTotal()
		}

		if (e.currentTarget.dataset.name === 'store') {
			this.setData({
				selectBarName: e.currentTarget.dataset.name,
				needUpdate: true,
			})
		} else {
			this.setData({
				selectBarName: e.currentTarget.dataset.name,
				needUpdate: false
			})
		}	
  	},

  	getQuestionTotal: function () { 
		request(/*config.NEW_BOND.questionTotalQuery*/ config.NEW_BOND.questionQuery, {
			bond_id: this.data.bondId
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					questionTotal: result.data.retdata.ask_array.length
				})
			}
		})
	},

	onUpdateStoreDetail: function (e) {
		let detail = e.detail
		let isMyStore = String(detail.is_myself) === '1' && String(this.data.uid) === '0'

		this.setData({
			isMyStore: isMyStore,
			isQtrade: String(detail.is_qtrade) === '1',
			userId: detail.user_id
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
		selectBarName: options.bname ? options.bname : 'info'
	})
	this.getQuestionTotal()
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
  	console.log('onShow...', this.data.userId)
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
  onShareAppMessage: function (ops) {
	if (ops.from === 'button') {
		// 来自页面内转发按钮
		console.log(ops.target)
		console.log('buttton')
	  } else {
		  console.log('onShareAppMessage.......')
	  }

	  let path = '/app/page/bond-detail/bond-detail?from=share&bid=' + this.data.bondId +'&uid=' + this.data.userId + '&bname=' + this.data.selectBarName
	  console.log(path) 
	  return {
		title: 'Qtrade一级债小程序',
		desc: 'desc....',
		path: path,
		success: function (res) {
		  // 转发成功
		  console.log("转发成功:" + JSON.stringify(res));
		},
		fail: function (res) {
		  // 转发失败
		  console.log("转发失败:" + JSON.stringify(res));
		}
	  }
  }
})