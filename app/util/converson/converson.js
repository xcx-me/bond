module.exports = {
	parseToObject: function (list) {
		let flag = {}
		list.forEach((item) => {
			flag[String(item)] = true
		})
		return flag
	},
	parseToArray: function (object) {
		let keys = Object.keys(object)
		let array = []
		keys.forEach((item) => {
			if (object[item]) {
				array.push(item)
			}
		})
		return array
	},
	saveValueOfArray: function (object) {
		let array = []
		object.map((item, index) => {
			array.push(item.name)
		})
		return array
	}
}
