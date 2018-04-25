// app/ui/form-viewer-editor/text-input/text-input.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		fieldName: {
			type: String,
			value: ''
		},
		value: {
			type: String,
			value: ''
		},
		label: {
			type: String,
			value: ''
		},
		placeholder: {
			type: String,
			value: ''
		},
		maxlength: {
			type: Number,
			value: -1
		},
		type: {
			type: String,
			value: 'text'
		},
		hasWarning: {
			type: Boolean,
			value: false
		},
		mandatory: {
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
		handleInputChange: function (e) {
			this.triggerEvent('change', {
				fieldName: e.currentTarget.dataset.fieldName,
				value: e.detail.value
			})
		}
	}
})
