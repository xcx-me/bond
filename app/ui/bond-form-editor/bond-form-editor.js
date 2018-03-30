Component({
	properties: {
		editorFlag: { // 是否是编辑债券的入口
			type: Boolean,
			value: false
		},

	},

	data: {
		formData: {
			bondName: '',
			subjectRate: '',
			facilityRate: '',
			rateMethod: '',
			benchMark: '',
			circulation: '',
			releaseTime: ''
		},
		// date: '',

		// 这里是一些组件内部数据
		text: "text",

		//  利率方式
		rateWayArray: ['利随本清', '固定利率', '浮动利率', '累积利率'],
		rateWayIndex: -1,
		rateReply: false
	},

	methods: {
		changeValue (e) { // 改变各input的value
			let formData = this.data.formData
			formData[e.currentTarget.dataset.inputName] = e.detail.value
			this.setData({
				formData: formData
			})
			this.triggerEvent('changeValueEvent', formData)
		},

		// bindDateChange: function(e) {
		// 	console.log('picker发送选择改变，携带值为', e.detail.value)
		// 	// let formData = this.data.formData
		// 	// formData[e.currentTarget.dataset.inputName] = e.detail.value
		// 	this.setData({
		// 		date: e.detail.value
		// 	})
		// },

		handleDropdownRateWay: function (e) {
			console.log('----checked: ', this.data.rateWayArray[e.detail.value])
			// wx.showToast({
			// 	title: 'this is blank。。。',
			// 	icon: 'success',
			// 	duration: 800
			// })
			if (e.detail.value == 2) {
				this.setData({ rateReply: true })
			} else {
				this.setData({ rateReply: false })
			}
			let formData = this.data.formData
			formData.rateMethod = this.data.rateWayArray[e.detail.value]
			this.setData({
				rateWayIndex: e.detail.value,
				formData: formData
			})
		}
	}
})