module.exports = {
	parseAssociateBondSimpleName: function(curName, ascBondSimpleNameList) {
		let result = []
		if (curName === '') {
			return result
		}
		ascBondSimpleNameList.map((item) => {
			let newValueList = []
			let bondSimpleName = item.bond_simple_name
			let lowerBondSimpleName = bondSimpleName.toLowerCase()
			let valueList = lowerBondSimpleName.split(curName.toLowerCase())
			let positionStart = lowerBondSimpleName.indexOf(curName.toLowerCase())
			let positionEnd = positionStart + curName.length
			let highlightValue = bondSimpleName.slice(positionStart, positionEnd)

			valueList.map((value, index) => {
				newValueList.push({
					value: value,
					tag: 0
				})
				if (index < valueList.length - 1) {
					newValueList.push({
						value: highlightValue,
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
	}
}