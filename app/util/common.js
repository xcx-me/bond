module.exports = {
	showFailedToast: function (title) {
		wx.showToast({
			title: title || '操作失败，请稍后再试',
			icon: 'none',
			mask: true,
			duration: 1000
		})
	},

	showToast: function (text, iconType, showTime) { // icon 只支持'success' 和 'loading'
		wx.showToast({
			title: text,
			icon: iconType,
			duration: showTime
		})
	},


	formatDate: function (date) {  
		var year = date.getFullYear()  
		var month = date.getMonth() + 1  
		var day = date.getDate()  
		
		var hour = date.getHours()  
		var minute = date.getMinutes()  
		var second = date.getSeconds()  
		
		// return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
		return [year, month, day].map(this.formatNumber).join('-')
	},
		
	formatNumber: function(n) {  
		n = n.toString()  
		return n[1] ? n : '0' + n  
	},

	formateFilterDate: function (originDate) {
		let newDate = new Date(originDate)
		let month = this.formatNumber(newDate.getMonth() + 1)
		let date = this.formatNumber(newDate.getDate())
		let day = newDate.getDay()
		let isToday = newDate.toDateString() === new Date().toDateString()
		let sevenDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		let weekDay = isToday ? '今天' : sevenDays[day]
		return {'originalDate': originDate, 'date': month + '-' + date, 'weekDay': weekDay, isToday: isToday}
	}
}