// app/ui/store/dynamic/dynamic.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
let timeId = null

Component({
 	properties: {
		detailUrl: {
			type: String,
			value: ''
		},
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal) {
				this.getDynamicList()
				if (newVal && !oldVal) {
					this.setDynamicTimer()
				}
			}
		}
  	},

  	data: {
		dynamicList: [],
		showLoading: true,
		emptyData: true
  	},

  	ready: function () {
		this.getDynamicList()
	},

	methods: {
		getDynamicList: function () {
			request(config.NEW_BOND.news, {}).then((result) => {
				if (String(result.data.ret) === '0') {
					let dataList = result.data.retdata.dynamic_tips
					this.setData({
						dynamicList: dataList,
						showLoading: false,
						emptyData: dataList.length === 0
					})
				} else {
					this.setData({
						showLoading: false
					})
				}
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

		clearDynamicTip: function (e) {
			let bondSimpleName = e.currentTarget.dataset.name
			request(config.NEW_BOND.deleteNews, {
				bond_simple_name: bondSimpleName
			}).then((result) => {})
		}
	}
})
