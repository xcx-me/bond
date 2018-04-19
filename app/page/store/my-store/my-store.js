// app/page/store/my-store/my-store.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	isStoreRegistered: {
		type: Boolean,
		value: false
	},
	uid:  {
		type: String,
		value: ''
	},
	userId: {
		type: String,
		value: ''
	},
	isQtrade: {
		type: Boolean,
		value: false	
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
	needUpdateDyNamic: false,
  },

  ready: function () {
		let that = this
		wx.getSystemInfo({
			success: function(res) {
				let height = res.windowHeight - (res.windowWidth / 750 * 160)
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
			currentTabId: currentTabId,
			needUpdateDyNamic: currentTabId === 'dynamic'
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

	bindDownLoad: function(e) {
		console.log('bindDownLoad.....')
	},

	topLoad: function(e) {
		console.log('topLoad.....')
	},

	scroll: function(e) {
		console.log('scroll...')
	}
  }
})
