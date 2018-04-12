// app/page/market/date-bar/date-bar.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const common = require('../../../util/common')
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
		currentDate: '',
		dateList: []
  	},

  ready: function () {
	  this.getDateList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
	getDateList: function () {
		request(config.NEW_BOND.getWorkdaysInfo, {}).then((result) => {
			if (String(result.data.ret) === '0') {
				let dateList = []
				let currentDate = ''
				let sevenDays = ['日', '一', '二', '三', '四', '五', '六']
				result.data.retdata.workdays.split(',').map((item, index) => {
					let formatDate = common.formateFilterDate(item)
					if(formatDate.isToday) {
						currentDate = item
					}
					dateList.push(common.formateFilterDate(item))
				})
				this.setData({
					dateList: dateList,
					currentDate: currentDate
				})
			}
		})
	  },

	  changeDate: function (e) {
		  let index = e.currentTarget.dataset.index
		  let currentDate = this.data.dateList[index].originalDate
		  this.setData({
			currentDate: currentDate
		  })
		  this.triggerEvent('onFilterEvent', {date:currentDate} )
	  }
  }
})
