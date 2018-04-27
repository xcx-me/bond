// app/ui/bond-list/bond-list.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const {getStatus, getType} = require('../../util/type/bond-list')
Component({
  /**
   * 组件的属性列表
   */
	properties: {
		bondId: {
			type: String,
			value: ''	
		},
		userId: {
			type: String,
			value: ''
		},
		uid: {
			type: String,
			value: ''
		},
		from: {
			type: String,
			value: ''
		},
		isMine: {
			type: Boolean,
			value: false
		},
		type: {
			type: Number,
			value: getType.OTHERS
		},
		isDeleting: {
			type: Boolean,
			value: false
		},
		isModifying: {
			type: Boolean,
			value: false
		},
		status: {
			type: Number,
			value: getStatus.INIT,
			observer: function(newVal, oldVal) {
				if (newVal !== getStatus.ENDLOADED) {
					this.getBondList(this.data.type, newVal)
				}
			}
		}
	},

	ready: function () {
		this.getBondList(this.data.type, this.data.status)
	},
  /**
   * 组件的初始数据
   */
  data: {
	page: 0,
	pageSize: 10,
	bondList: [], 
	firstLoading: true,
	moreLoading: false,
	overLoaded: false
  },

  /**
   * 组件的方法列表
   */
	methods: {
		initStatus: function(status) {
			if (status === getStatus.FRESH) {
				wx.showNavigationBarLoading()
			}else if (status === getStatus.LOADMORE) {
				this.setData({
					moreLoading: true
				})
			}
		},

		updataStatus: function(status) {
			if (status === getStatus.FRESH) {
				wx.hideNavigationBarLoading() // 完成停止加载
				wx.stopPullDownRefresh() // 停止下拉刷新
			}
			this.data.status = getStatus.ENDLOADED	
		},

		setBondListPostData: function(type, status, limit) {
			return {
				bond_id: type === getType.OTHERS ? this.data.bondId : '',
				user_id: type === getType.MYOTHERS || type === getType.OTHERS ? this.data.userId : '',
				offset: status === getStatus.LOADMORE ? this.data.page * this.data.pageSize : 0,
				limit: limit,
				type: type
			}
		},

		updateBondList: function (status, retBondList, limit) {
			let bondList = status === getStatus.LOADMORE ? this.data.bondList.concat(retBondList) : retBondList
			let overLoaded = retBondList.length < limit
			let page = status === getStatus.INIT || status === getStatus.FRESH ? 0 : this.data.page

			this.setData({
				bondList: bondList,
				firstLoading: false,
				moreLoading: false,
				overLoaded: overLoaded,
				page: overLoaded ? page: page + 1
			})
		},

		getBondList: function (type, status) {
			if (status === getStatus.LOADMORE && this.data.overLoaded) {
				return 
			} 
			
			this.initStatus(status)

			let limit = status === getStatus.UPDATE ? Math.max(this.data.bondList.length, this.data.pageSize) : this.data.pageSize
			let postData = this.setBondListPostData(type, status, limit)
			request(config.NEW_BOND.newBondList, postData).then((result) => {
				let retBondList = result.retdata.bond_list
				this.updateBondList(status, retBondList, limit)
				this.updataStatus(status)
			})
		},

		onWillDeleteBondEvent: function (e) {
			this.triggerEvent('deleteEvent', true)
		},

		onDoDeleteBondEvent: function (e) {
			let bondSimpleName= e.detail
			if (bondSimpleName) {
				request(config.NEW_BOND.deleteBond, {bond_simple_name: bondSimpleName}).then((result)=>{
					this.getBondList(this.data.type, getStatus.UPDATE)
				})
			}
			
			this.triggerEvent('deleteEvent', false)
		}		
  	}
})
