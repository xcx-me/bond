
function withData (param) {
	return parseInt(param) < 10 ? '0' + parseInt(param) : '' + parseInt(param)
}

function getLoopArray (start,end) {
	var start = start || 0
	var end = end || 1
	var array = []
	for (var i = start; i <= end; i++) {
		array.push(withData(i))
	}
	return array
}

function getMonthDay (year, month, startDate) {
	let flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null

	switch (month) {
	  case '01':
	  case '03':
	  case '05':
	  case '07':
	  case '08':
	  case '10':
	  case '12':
		array = getLoopArray(startDate ? startDate : 1, 31)
		break
	  case '04':
	  case '06':
	  case '09':
	  case '11':
		array = getLoopArray(startDate ? startDate : 1, 30)
		break
	  case '02':
		array = flag ? getLoopArray(startDate ? startDate : 1, 29) : getLoopArray(startDate ? startDate : 1, 28)
		break
	  default:
		array = '月份格式不正确，请重新输入！'
	}
	return array
}

function getNewDateArry () {
	// 当前时间的处理
	let newDate = new Date()
	let year = withData(newDate.getFullYear()),
		mont = withData(newDate.getMonth() + 1),
		date = withData(newDate.getDate()),
		hour = withData(newDate.getHours()),
		minu = withData(newDate.getMinutes()),
		seco = withData(newDate.getSeconds())

	return [year, mont, date, hour, minu, seco]
}

function dateTimePicker (startYear, endYear, startMonth, startDay, date) {
	let endMonth = 12

	// 返回默认显示的数组和联动数组的声明
	let dateTime = [], dateTimeArray = [[],[],[],[],[],[]]
	let start = startYear || 1978
	let end = endYear || 2100
	// 默认开始显示数据
	var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry()
	// 处理联动列表数据
	/*年月日 时分秒*/ 
	dateTimeArray[0] = getLoopArray(start, end)
	dateTimeArray[1] = getLoopArray(startMonth, endMonth)

	// dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1])
	dateTimeArray[2] = getMonthDay(startYear, startMonth, startDay)

	dateTimeArray[3] = getLoopArray(0, 23)
	dateTimeArray[4] = getLoopArray(0, 59)
	dateTimeArray[5] = getLoopArray(0, 59)

	dateTimeArray.forEach((current,index) => {
	  dateTime.push(current.indexOf(defaultDate[index]))
	})

	return {
	  dateTimeArray: dateTimeArray,
	  dateTime: dateTime
	}
}

module.exports = {
	dateTimePicker: dateTimePicker,
	getMonthDay: getMonthDay,
	getLoopArray: getLoopArray,
	withData: withData
}
