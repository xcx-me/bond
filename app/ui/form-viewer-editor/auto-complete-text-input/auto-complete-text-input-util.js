module.exports = {
	parseAssociateBondSimpleName: function(curName, ascBondSimpleNameList) {
		let result = []
		if (curName === '') {
			return result
		}
		ascBondSimpleNameList.map((item) => {
			let newValueList = []
			let bondSimpleName = item.bond_simple_name
			let lowerCurrentName = curName.toLowerCase()
			let lowerBondSimpleName = bondSimpleName.toLowerCase()
			let valueList = lowerBondSimpleName.split(lowerCurrentName)

			let findedStrs = new Array()
			this.subStrPosition(lowerBondSimpleName, lowerCurrentName).forEach((value, index) => {
				findedStrs.push(bondSimpleName.slice(value, value + curName.length))
			})

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

	subStrPosition: function (str, subStr){
		let positions = new Array() 
		let pos = str.indexOf(subStr)
		while (pos > -1 ) {
			positions.push(pos)
			pos = str.indexOf(subStr, pos + 1)
		}
		return positions
	}
}