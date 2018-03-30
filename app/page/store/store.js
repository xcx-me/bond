// app/page/store/store.js
var common = require('../../util/common.js')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

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
		isMyStore: false,
		isQtrade: false,
		bondList: [],
		needUpdate: false,
		vUrl: '../../asset/image/qtrade/sprites_01.png',
		showLoading: true,
		from: ''
  	},

  getBondList: function(userId, len = 10) {
	let offset = 0
	let limit = len < 10 ? 10: len
	request(config.NEW_BOND.newBondList, {
		bond_id: '0',
		user_id: userId,
		offset: offset,
		limit: limit,
		used_for_management: '0'
	}).then((result) => {
		if (String(result.data.ret) === '0') {
			this.setData({
				bondList: result.data.retdata.bond_list,
				showLoading: false
			})
		} else {
			this.setData({
				showLoading: false
			})
		}
	}).catch(()=>{
		this.setData({
			showLoading: false
		})
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
		wx.setNavigationBarTitle({title: isMyStore ? '我的店铺': detail.sale_name + '的店铺'})
  },

  	_deleteBondEvent: function (e) {
		let bname = e.detail
		request(config.NEW_BOND.deleteBond, {
			bond_simple_name: bname
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.getBondList(this.data.uid, this.data.bondList.length)
			}
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
	this.dialog = this.selectComponent('#dialog')
	// console.log('ready...', this.data.userId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  	onShow: function () {
		this.setData({
			needUpdate: true
		})
		if (this.data.uid) {
			this.getBondList(this.data.uid, 10)
		}
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
		console.log(ops.target)
		console.log('buttton')
	  } else {
		  console.log('onShareAppMessage.......')
	  }
	  console.log('/app/page/store/store?from=share&uid=' + this.data.userId)
	  return {
		title: 'Qtrade一级债小程序',
		desc: 'desc....',
		path: '/app/page/store/store?from=share&uid=' + this.data.userId,
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