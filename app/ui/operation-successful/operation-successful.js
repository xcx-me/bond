// app/ui/operation-successful/operation-successful.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: ''
		},
		description: {
			type: String,
			value: ''			
		},
		buttonLabel: {
			type: String,
			value: ''				
		},
		imagePath: {
			type: String,
			value: ''				
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
		doNext: function () {
			wx.navigateBack()
		}
	}
})
