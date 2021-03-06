module.exports = {
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
		let sevenDays = ['日', '一', '二', '三', '四', '五', '六']
		let weekDay = sevenDays[day]
		return {'originalDate': originDate, 'date': date, 'weekDay': weekDay, isToday: isToday}
	}
}