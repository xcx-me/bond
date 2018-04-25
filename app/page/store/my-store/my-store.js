// app/page/store/my-store/my-store.js
const {getStatus, getType} = require('../../../util/type/bond-list')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
	isStoreRegistered: {
		type: Boolean,
		value: false
	},
	bondListType: {
		type: Number,
		value: 0
	},
	bondListStatus: {
		type: Number,
		value: 0
	},
	uid:  {
		type: String,
		value: ''
	},
	userId: {
		type: String,
		value: ''
	},
	needUpdate: {
		type: Boolean,
		value: false
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	tabIdList:['bond-list', 'dynamic'],
	currentTabId: 'bond-list',
	winHeight: '',
	dynamicTotal: 0,
	scrollTop: 0
  },

  ready: function () {
		let that = this
		wx.getSystemInfo({
			success: function(res) {
				let height = res.windowHeight - (res.windowWidth / 750 * 380)
				that.setData({
					winHeight: height
				})
			}
		})
  },

  /**
   * 组件的方法列表
   */
  methods: {
		/**
     * 滑动切换tab
     */
	bindChangeTab: function (e) {
		let currentTabId = e.detail.currentItemId
		this.setData({
			currentTabId: currentTabId
		})
	},

	/** 
	 * 点击tab切换 
	 */  
	switchNav: function (e) {
		let tabId = e.currentTarget.dataset.tid
		if(this.data.currentTabId === tabId) {
			return false;
		} else {
			this.setData({
				currentTabId: tabId
			})
		}
	},

	onUpdateDynamicEvent: function(e) {
		this.setData({
			dynamicTotal: e.detail.total
		})
	},

	topLoad: function(e) {
		this.triggerEvent('updateEvent', getStatus.FRESH)
	},

	bindDownLoad: function(e) {
		this.triggerEvent('updateEvent', getStatus.LOADMORE)
	},
  }
})
