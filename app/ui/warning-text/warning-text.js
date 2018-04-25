
Component({
	properties: {
		isShow: {
			type: Boolean,
			type: false,
			observer: function (newValue, oldValue) {
				if (newValue) {
					this.setData({
						visible: true
					})
					setTimeout(() => {
						this.setData({
							visible: false
						})
						this.properties.isShow = false
					}, 1500)
				}
			}
		},
		toolTips: {
			type: String,
			value: '格式输入错误，请重新输入'
		}
	},

	data: {
		visible: false
	},

	methods: {

	},
})