// app/ui/store/dynamic/dynamic.js
const service = require('../../../util/service/service')
let timeId = null

Component({
 	properties: {
  	},

  	data: {
		dynamicList: [],
		loading: true,
		emptyData: true
  	},

  	ready: function () {
		this.getDynamicList()
		this.setDynamicTimer()
	},

	methods: {
		getDynamicList: function () {
			service.getStoreDynamic((result) => {
				let dataList = result.data.retdata.dynamic_tips
				this.setData({
					dynamicList: dataList,
					loading: false,
					emptyData: dataList.length === 0
				})

				this.triggerEvent('updateEvent', {total: dataList.length})
			})
		},

	
		setDynamicTimer: function () {
			timeId = setInterval(() => {
				let needUpdate= this.data.needUpdate
				if (needUpdate) {
					this.getDynamicList()
				} else {
					clearInterval(timeId)
				}
			}, 60*1000)
		},

		clickDynamic: function (e) {
			let index = e.currentTarget.dataset.index
			let bondId = this.data.dynamicList[index].bond_id
			let bondSimpleName = this.data.dynamicList[index].bond_simple_name
			this.clearDynamicTip(bondSimpleName)
			this.navigateToBondDetail(bondId)
		},

		clearDynamicTip: function (bondSimpleName) {
			service.deleteStoreDynamic(bondSimpleName,()=>{}, ()=>{})
		},

		navigateToBondDetail(bondId) {
			let url=`/app/page/bond-detail/bond-detail?bid=${bondId}&uid=0&tid=question`
			wx.navigateTo({
				url: url
			})
		}
	}
})
