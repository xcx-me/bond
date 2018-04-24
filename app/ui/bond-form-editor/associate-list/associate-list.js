
Component({
	properties: {
		isShowList: {
			type: Boolean,
			value: false
		}
	},

	data: {
		// ascNameListOpen: false,
		simpleNameList: ['利随本清', '固定利率', '浮动利率', '累积利率', '浮动利率', '累积利率']
	},

	methods: {
		closeAssociateList: function () {
			console.log('closeAssociateList')
			// this.setData({
			// 	ascNameListOpen: false,
			// })
			// this.triggerEvent('changeFixedPageScroll', false)
		},

		checkAscBondName: function (e) {
			console.log('checkAscBondName')
			// this.associateBondDetails(e.currentTarget.dataset.bondName)
			// this.setData({
			// 	ascNameListOpen: false,
			// 	simpleNameList: []
			// })
			// this.triggerEvent('changeFixedPageScroll', false)
		},

		associateRequest: function () {
			console.log('request....')
		},
	}
})