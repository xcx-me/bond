// app/page/market/filter/filter.js
const filter = require('../../../util//filter/filter')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	isShow: {
		type: Boolean,
		value: false,
		observer: function(newVal, oldVal) {
			if (!newVal) {
				this.initFilter()
			}	
		}
	},
	tabId: {
		type: String,
		value: false,
		observer: function(newVal, oldVal) {
			if (newVal) {
				this.initFilter()
			}	
		}
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	prevFilterConfig: JSON.parse(JSON.stringify(filter.defaultConfig)),
	filterConfig: JSON.parse(JSON.stringify(filter.defaultConfig)),
	filterValue: {},
	selectIndex: 0
  },

  ready: function () {
	// console.log('ready...', this.data.filterConfig)
  },

  /**
   * 组件的方法列表
   */
  methods: {
	onShowFilter: function (e) {
		let selectIndex = e.currentTarget.dataset.index
		let filterConfig = JSON.parse(JSON.stringify(this.data.prevFilterConfig))
		filterConfig.map((filter, index) => {
			filter.isShow = String(index) === String(selectIndex)
		})
	
		this.setData({
			selectIndex: selectIndex,
			filterConfig: filterConfig,
		})

		this.triggerEvent('showFilterEvent', true)
	},

	initFilter: function () {
		let filterConfig = JSON.parse(JSON.stringify(filter.defaultConfig))
		let prevFilterConfig = JSON.parse(JSON.stringify(filter.defaultConfig))
		this.setData({
			prevFilterConfig: prevFilterConfig,
			filterConfig: filterConfig,
			prevFilterConfig: prevFilterConfig
		})
	},

	checkboxChange: function (e) {
	},

	clickFilterOption: function (e) {
		let index = e.currentTarget.dataset.index
		let optionIndex = e.currentTarget.dataset.optionindex
		let filterConfig = this.data.filterConfig
		let values = filterConfig[index].values
		let selectList = []
		values.map((item, valueIndex) => {
			if ((item.isSelected && valueIndex !== optionIndex) ||(!item.isSelected && valueIndex === optionIndex) ) {
				selectList.push(valueIndex)
			}
			item.isSelected = false
		})
	
		if ((optionIndex === 0 && selectList.length > 0 )|| selectList.length === 0) { // 选中"不限"
			values[0].isSelected = true
		} else {
			selectList.map((value) => {
				values[value].isSelected = value !== 0
			})
		}
		
		this.setData({
			filterConfig: filterConfig
		})
	},

	onReset: function (e) {
		let filterIndex = e.currentTarget.dataset.index
		let filterConfig = this.data.filterConfig
		let defaultConfig = JSON.parse(JSON.stringify(filter.defaultConfig))
		filterConfig[filterIndex] = defaultConfig[filterIndex]
		filterConfig[filterIndex].isShow = true
		this.setData({
			filterConfig:  filterConfig
		})
	},

	onConfirm: function (e) {
		let {filterConfig, filterValue} = this.data
		let index = e.currentTarget.dataset.index
		filterConfig[index].isShow = false
		const defaultConfig = filter.defaultConfig
		defaultConfig.map ((defaultItem, itemIndex) => {
			let filterName = defaultItem.name
			let valueList = []
			filterConfig[itemIndex].values.map ((item) => {
				if (item.isSelected) {
					valueList.push(item.value)
				}	
			})
			filterValue[filterName] = valueList.join('|')
		})
		
		this.setData({
			prevFilterConfig: JSON.parse(JSON.stringify(filterConfig)),
			filterConfig: filterConfig,
			filterValue: filterValue
		})

		this.triggerEvent('doFilterEvent', filterValue)
	},

	onCancel: function (e) {
		let filterConfig = JSON.parse(JSON.stringify(this.data.prevFilterConfig))
		let index = e.currentTarget.dataset.index
		filterConfig[index].isShow = false	
		this.setData({
			filterConfig: filterConfig
		})
		this.triggerEvent('doFilterEvent', null)
	}
  }
})
