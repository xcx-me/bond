const {requestUploadFile} = require('../../../util/ajax/ajax')
import {isValidExtension, toMB} from './file-uploader-util'

const SOURCE_TYPE_CAMERA = 'camera'
const SOURCE_TYPE_ALBUM = 'album'

const uploadUrl = '/appletree/upload_card.do'
const extensionList = ['jpeg', 'jpg', 'png']
const maxSizeInMB = 5

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
		progress: -1
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
			if (this.properties.disabled) return

			if (this.data.progress !== -1) return
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
					let tempFile = res.tempFiles[0]
					if (!isValidExtension(tempFile.path, extensionList)) {
						wx.showModal({
							content: '只能上传以下后缀的文件：' + extensionList.join(', '),
							confirmText: '确定',
							confirmColor: '#2196F3',
							showCancel: false
						})
						return false
					}

					if (toMB(tempFile.size) > maxSizeInMB) {
						wx.showModal({
							content: `不能上传大于${maxSizeInMB}MB的文件`,
							confirmText: '确定',
							confirmColor: '#2196F3',
							showCancel: false
						})
						return false
					}

					host.triggerEvent('change', {
						fieldName: host.properties.fieldName,
						value: tempFile.path
					})

					const uploadTask = requestUploadFile('/appletree/upload_card.do', tempFile.path, (result) => {
						host.triggerEvent('change', {
							fieldName: host.properties.fieldName,
							value: result.card_url
						})
						host.setData({
							// value -1 means to hide the progress number.
							progress: -1
						})
					})

					uploadTask.onProgressUpdate((res) => {
						host.setData({
							progress: res.progress
						})
					})
				}
			})
		},

		showActionSheet: function () {
			if (this.properties.disabled) return
			let host = this
			wx.showActionSheet({
				itemList: ['拍照', '从手机相册选择'],
				success: function (res) {
					res.tapIndex === 0 && host.chooseImage(SOURCE_TYPE_CAMERA)
					res.tapIndex === 1 && host.chooseImage(SOURCE_TYPE_ALBUM)
				},
				fail: function (res) {}
			})
		}
	}
})
