const PERIOD = 60
const DAFAULT_LABEL = '获取验证码'

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		disabled: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal){
				console.log('newVal', newVal, 'oldVal', oldVal)
			}
		},
		skin: {
			type: String,
			value: ''
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		label: DAFAULT_LABEL,
		disabled: false
	},

	counter: PERIOD,

	/**
	 * 组件的方法列表
	 */
	methods: {
		getMobileVerificationCode: function (e) {
			if (this.data.disabled) return
			this.triggerEvent('getMobileVerificationCode')
			this.updateLabel()
		},

		setLabelByCondition: function (disabled, counter) {
			this.setData({
				label: disabled ? `${counter}秒后重发` : DAFAULT_LABEL,
				disabled: disabled
			})
		},

		updateLabel: function () {
			this.setLabelByCondition(true, PERIOD)
			let counter = PERIOD
			let timer = setInterval(() => {
				counter--
				if (counter === 0) {
					clearInterval(timer)
					counter = PERIOD
					this.setLabelByCondition(false)
					return
				}
				this.setLabelByCondition(true, counter)
			}, 1000)
		}
	}
})
