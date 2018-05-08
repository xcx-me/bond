// app/ui/store/dynamic/dynamic.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const Click = require('../../../util/click/click')
let timeId = null

Component({
 	properties: {
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal) {
				if (newVal) {
					this.getDynamicList()
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
	},

	methods: {
		getDynamicList: function () {
			request(config.NEW_BOND.news, {}).then((result) => {
				let dataList = result.retdata.dynamic_tips
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
			request(config.NEW_BOND.deleteNews, {bond_simple_name: bondSimpleName})
		},

		navigateToBondDetail(bondId) {
			Click.check(() => {
				let url=`/app/page/bond-detail/bond-detail?bid=${bondId}&uid=0&tid=question`
				wx.navigateTo({
					url: url,
					complete: () => {
						Click.enable()
					}
				})
			})
		}
	}
})
