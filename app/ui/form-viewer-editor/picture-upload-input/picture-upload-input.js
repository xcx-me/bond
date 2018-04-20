// app/ui/form-viewer-editor/picture-upload-input/picture-upload-input.js
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
		useCamera: function () {
			console.log('user camera')
			let host = this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					// var tempFilePaths = res.tempFilePaths
					//console.log('tempFilePaths', tempFilePaths)

					// console.log('host.properties.fieldName', host.properties.fieldName)

					host.triggerEvent('change', {
						fieldName: host.properties.fieldName,
						value: res.tempFilePaths[0]
					})
				}
			})
		},

		useAlbum: function () {
			console.log('user album')
		},

		showActionSheet: function () {
			let host = this
			wx.showActionSheet({
				itemList: ['拍照', '从手机相册选择'],
				success: function (res) {
					console.log(res.tapIndex)
					res.tapIndex === 0 && host.useCamera()
					res.tapIndex === 1 && host.useAlbum()
				},
				fail: function (res) {
					console.log(res.errMsg)
				}
			})
		}
	}
})
