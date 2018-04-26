
Component({
	properties: {
		nameListVisible: {
			type: Boolean,
			value: false
		},
		// searchValue: {
		// 	type: String,
		// 	value: ''
		// },
		memberList: {
			type: Object,
			value: [],
			// observer: function (newVal, oldVal) {
			// 	// parseAscBondSimpleName: function (curName, newVal) {
			// 		let result = []
			// 		if (this.data.searchValue === '') {
			// 			return result
			// 		}
			// 		newVal.map((item) => {
			// 			let bondSimpleName = item.bond_simple_name
			// 			let valueList = bondSimpleName.split(this.data.searchValue)
			// 			let newValueList = []
			// 			valueList.map((value, index) => {
			// 				newValueList.push({
			// 					value: value,
			// 					tag: 0
			// 				})
			// 				if (index < valueList.length - 1) {
			// 					newValueList.push({
			// 						value: this.data.searchValue,
			// 						tag: 1
			// 					})
			// 				}
			// 			})
			// 			result.push({
			// 				value: bondSimpleName,
			// 				list: newValueList
			// 			})
			// 		})
			// 		return result
			// 	// }
			// }
		}
	},

	data: {
		nameListVisible: false
	},

	methods: {
		onHandleClose: function () {
			this.triggerEvent('onHandleCloseList', false)
		},

		onHandleSelect: function (e) {
			this.triggerEvent('onHandleSelectItem', e.currentTarget.dataset.memberName)
		}
	}
})