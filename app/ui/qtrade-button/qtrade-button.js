// app/ui/qtrade-button/qtrade-button.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		skin: {
			type: String,
			value: 'submit'
		},
		label: {
			type: String,
			value: '继续'
		},
		disabled: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleTap: function (e) {
			this.triggerEvent('click', e.detail)
		}
	}
})