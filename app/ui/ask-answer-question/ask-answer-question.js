// app/ui/ask-answer-question/ask-answer-question.js
const service = require('../../util/service/service')
const common = require('../../util/common')
Component({
	properties: {
		isAsk: {
			type: Boolean,
			value: false
		},
		bondId:{
			type: String,
			value: ''
		},
		userId: {
			type: String,
			value: ''
		},
		askId: {
			type: String,
			value: ''
		},
		bondSimpleName: {
			type: String,
			value: ''
		}
	},
  	/**
   	* 页面的初始数据
   	*/
 	 data: {
		  content: '',
		  isSubmitDisabled: true
  	},

	methods: {
		onTextAreaBlur: function(e) {
			let content = e.detail.value
			this.setData({
				content: content
			}) 
		},

		onFocus: function (e) {
			this.setData({
				errTips: ''
			})
		},
	
		onInput: function (e) {
			let value = e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
			this.setData({
				isSubmitDisabled: value.length === 0
			})
		},

		onFormSubmit: function(e) {
			let content = this.data.content
			if (this.data.isAsk) {
				service.doAsk(this.data.bondSimpleName, this.data.content, this.data.userId, (result)=>{
					this.onSuccess()
				}, (result) => {
					this.onFailed(result)
				})
			} else {
				service.doAnswer(this.data.askId, this.data.content, (result)=>{
					this.onSuccess()
				}, (result) => {
					this.onFailed(result)
				})
			}
		},
	
		onNavigateBack: function() {
			let url = '/app/page/bond-detail/bond-detail?from=share&bid=' + this.data.bondId +'&uid=' + this.data.userId + '&tid=question'
			wx.navigateBack({
				url: url
			})
		},

		onSuccess: function () {
			this.onNavigateBack()
		},
	
		onFailed: function (result) {
			console.log('onFailed...', this.data, result)
			if (result && result.data && result.data.ret) {
				let ret = String(result.data.ret)
				if (ret === '-2') {
					common.showFailedToast('非V用户不可以' + this.data.isAsk ? '提问' : '回答')
				} else if (ret === '-3') {
					common.showFailedToast('操作太频繁，请明天再试')
				} else {
					common.showFailedToast('操作失败，请稍后再试')
				}
			} else {
				common.showFailedToast('系统繁忙，请稍后再试')
			}
		}
	}
})
