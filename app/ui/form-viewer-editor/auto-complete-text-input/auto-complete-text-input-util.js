module.exports = {
	parseAssociateBondSimpleName: function(curName, ascBondSimpleNameList, keyFieldName) {
		let result = []
		if (curName === '') {
			return result
		}
		ascBondSimpleNameList.map((item) => {
			let newValueList = []
			let bondSimpleName = item[keyFieldName]
			let lowerCurrentName = curName.toLowerCase()
			let lowerBondSimpleName = bondSimpleName.toLowerCase()
			let valueList = lowerBondSimpleName.split(lowerCurrentName)

			// console.log(bondSimpleName)
			// let stayStrs = new Array()
			// this.stayStrPosition(bondSimpleName, curName).forEach((value, index) =>{
			// 	console.log('---stayStrPosition:', value)
			// 	// stayStrs.push(bondSimpleName.slice(start, value))
			// })
			// // console.log('=========stayStrs:', stayStrs)

			let findedStrs = new Array()
			let regexp = new RegExp(curName, 'gi')
			findedStrs = bondSimpleName.match(regexp)

			valueList.map((value, index) => {
				newValueList.push({
					value: value,
					tag: 0
				})
				if (index < valueList.length - 1) {
					newValueList.push({
						value: findedStrs[index],
						tag: 1
					})
				}
			})
			result.push({
				value: bondSimpleName,
				list: newValueList
			})
		})

		return result
	},

	// stayStrPosition: function (str, subStr) {
	// 	cutStr.forEach((cutStrItem, index) =>{
	// 		// stays = str.split(item)
	// 		str.split(cutStrItem).forEach((item, index) => {
	// 			stays.push(item[0])
	// 		})
	// 		console.log(stays)
	// 	})

	// 	return stays
	// },
}