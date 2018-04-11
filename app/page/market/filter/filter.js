// app/page/market/filter/filter.js
const filter = require('../../../util//filter/filter')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
	filterConfig:  filter.defaultConfig,
	curSelectList: [],
	filterValue: {}
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
		let filterConfig = this.data.filterConfig
		filterConfig.map((filter, index) => {
			filter.isShow = String(index) === String(selectIndex)
		})
		let curSelectList = []
		filterConfig[selectIndex].values.map ((item,index) => {
			if (item.isSelected) {
				curSelectList.push(index)
			}
		})
		this.setData({
			filterConfig: filterConfig,
			curSelectList: curSelectList
		})
	},

	checkboxChange: function (e) {
		let index = e.currentTarget.dataset.index
		let filterConfig = this.data.filterConfig
		filterConfig[index].values.map((item) => {
			item.isSelected = false
		})

		let valueList = e.detail.value
		let len = valueList.length
		if (len === 0 || valueList[len - 1] === '0') {
			filterConfig[index].values[0].isSelected = true
		} else {
			valueList.map((value) => {
				filterConfig[index].values[parseInt(value)].isSelected = value !== '0'
			})
		}
				
		this.setData({
			curSelectList: valueList,
			filterConfig: filterConfig
		})
	},

	onReset: function (e) {
		let filterIndex = e.currentTarget.dataset.index
		let filterConfig = this.data.filterConfig
		filterConfig[filterIndex] = filter.defaultConfig[filterIndex]
		filterConfig[filterIndex].isShow = true
		this.setData({
			filterConfig:  filterConfig,
			curSelectList: []
		})
	},

	onConfirm: function (e) {
		let {filterConfig, curSelectList, filterValue} = this.data
		let index = e.currentTarget.dataset.index
		filterConfig[index].isShow = false
		filter.defaultConfig.map ((item, itemIndex) => {
			let filterName = filter.defaultConfig[itemIndex].name
			let valueList = []
			filterConfig[itemIndex].values.map ((item) => {
				if (item.isSelected) {
					valueList.push(item.value)
				}	
			})
			filterValue[filterName] = valueList.join('|')
		})
		this.setData({
			filterConfig: filterConfig,
			curSelectList: [],
			filterValue: filterValue
		})

		this.triggerEvent('onFilterEvent', filterValue)
	}
  }
})
