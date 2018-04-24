// app/ui/bond-list/bond-list.js
const service = require('../../util/service/service')
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
		getBondList: function (type, status) {
			if (status === getStatus.LOADMORE && this.data.overLoaded) {
				return 
			}

			if (status === getStatus.FRESH) {
				wx.showNavigationBarLoading()
			}

			if (status === getStatus.LOADMORE) {
				this.setData({
					moreLoading: true
				})
			}

			let bondId = type === getType.OTHERS ? this.data.bondId : ''
			let userId = type === getType.MYOTHERS || type === getType.OTHERS ? this.data.userId : ''
			let offset = status === getStatus.LOADMORE ? this.data.page * this.data.pageSize : 0
			let limit = status === getStatus.UPDATE ? Math.max(this.data.bondList.length, this.data.pageSize) : this.data.pageSize
		
			let postData = {
				bond_id: bondId,
				user_id: userId,
				offset: offset,
				limit: limit,
				type: type
			}
			
			service.getBondList(postData, (result) => {
				let retBondList = result.data.retdata.bond_list
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
				
				if (status === getStatus.FRESH) {
					wx.hideNavigationBarLoading() // 完成停止加载
					wx.stopPullDownRefresh() // 停止下拉刷新
				}

				this.triggerEvent('updateEvent')
			})	
		},

		onWillDeleteBondEvent: function (e) {
			this.triggerEvent('deleteEvent', true)
		},

		onDoDeleteBondEvent: function (e) {
			let bname = e.detail
			if (bname) {
				service.deleteBond(bname, (result)=>{
					this.getBondList(this.data.type, getStatus.UPDATE)
				})
			}
			
			this.triggerEvent('deleteEvent', false)
		}		
  	}
})
