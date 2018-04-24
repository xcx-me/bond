const SOURCE_TYPE_CAMERA = 'camera'
const SOURCE_TYPE_ALBUM = 'album'

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
		preview: function () {
			wx.previewImage({
				urls: [this.properties.value] // 需要预览的图片http链接列表
			})
		},

		deletePicture: function () {
			this.triggerEvent('change', {
				fieldName: this.properties.fieldName,
				value: ''
			})
		},

		chooseImage: function (sourceType) {
			let host = this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: [sourceType],
				success: function (res) {
					host.triggerEvent('change', {
						fieldName: host.properties.fieldName,
						value: res.tempFilePaths[0]
					})
				}
			})
		},

		showActionSheet: function () {
			let host = this
			wx.showActionSheet({
				itemList: ['拍照', '从手机相册选择'],
				success: function (res) {
					console.log(res.tapIndex)
					res.tapIndex === 0 && host.chooseImage(SOURCE_TYPE_CAMERA)
					res.tapIndex === 1 && host.chooseImage(SOURCE_TYPE_ALBUM)
				},
				fail: function (res) {
					console.log(res.errMsg)
				}
			})
		}
	}
})
