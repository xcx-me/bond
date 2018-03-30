Component({
	properties: {
		// modalHidden: {
		// 	type: Boolean,
		// 	value: true
		// }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
		// modalMsg: {
		// 	type: String,
		// 	value: ' ',
		// },

		descriptors: { // 这里定义当组件调用时，需要传入的descriotors的数组
			type: Array,
			value: []
		}
	},

	data: {
		formData: {
			bondName: '债券简称',
			subjectRate: 'aa',
			facilityRate: 'AAA',
			rateMethod: '',
			benchMark: 'haha',
			circulation: '100'
		},

		// 这里是一些组件内部数据
		text: "text",

		//  利率方式
		casArray: ['利随本清', '固定利率', '浮动利率', '累积利率'],
		casIndex: -1,
		reply: false
	},

	methods: {
		changeValue (e) { // 改变各input的value
			let formData = this.data.formData
			formData[e.currentTarget.dataset.inputName] = e.detail.value
			this.setData({
				formData: formData
			})
		},

		handleDropdownRateWay: function (e) {
			console.log('----checked: ', this.data.casArray[e.detail.value])
			// wx.showToast({
			// 	title: 'this is blank。。。',
			// 	icon: 'success',
			// 	duration: 800
			// })
			if (e.detail.value == 2) {
				this.setData({ reply: true })
			} else {
				this.setData({ reply: false })
			}
			let formData = this.data.formData
			formData.rateMethod = this.data.casArray[e.detail.value]
			this.setData({
				casIndex: e.detail.value,
				formData: formData
			})
			console.log(this.data.formData)
		}
	}
})