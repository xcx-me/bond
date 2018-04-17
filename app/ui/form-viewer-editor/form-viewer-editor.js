const FormViewerEditorUtil = require('./form-viewer-editor-util')

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		descriptors: {
			type: Array,
			value: ''
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	findDescriptorByFieldName: function (descriptors, fieldName) {
		return descriptors.find((item) => {
			return item.fieldName === fieldName
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onChange: function (e) {
			let descriptors = this.data.descriptors
			FormViewerEditorUtil.setValueByFieldName(this, descriptors, e.detail.fieldName, 'value', e.detail.value)
			this.triggerEvent('changeDescriptors', {
				descriptors: descriptors
			})
		}
	}
})
