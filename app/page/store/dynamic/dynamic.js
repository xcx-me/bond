// app/ui/store/dynamic/dynamic.js
const service = require('../../../util/service/service')
let timeId = null

Component({
 	properties: {
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal) {
				console.log('update dynamic')
				this.getDynamicList()
				if (newVal && !oldVal) {
					this.setDynamicTimer()
				}
			}
		}
  	},

  	data: {
		dynamicList: [],
		loading: true,
		emptyData: true
  	},

  	ready: function () {
		// console.log('ready dynamic....')
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

				this.triggerEvent('updateRedPointEvent', dataList.length > 0)
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
