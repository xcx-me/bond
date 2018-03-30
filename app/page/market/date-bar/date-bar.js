// app/page/market/date-bar/date-bar.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

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
			console.log(result)
			if (String(result.data.ret) === '0') {
				let dateList = []
				let currentDate = ''
				let sevenDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				result.data.retdata.workdays.split(',').map((item, index) => {
					let getMonth = new Date(item).getMonth() + 1
					getMonth = getMonth < 10 ? '0' + getMonth : getMonth
					let getDate = new Date(item).getDate()
					getDate = getDate < 10 ? '0' + getDate : getDate
					let getDay = sevenDays[new Date(item).getDay()]
					let isToday = new Date(item).toDateString() === new Date().toDateString()
					getDay = isToday ? '今天' : getDay
					if (isToday) {
						currentDate = item
					}
					dateList.push({'originalDate': item, 'date': getMonth + '-' + getDate, 'getDay': getDay})
				})
				this.setData({
					dateList: dateList,
					currentDate: currentDate
				})
			}
		})
	  }
  }
})
