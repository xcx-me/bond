// app/ui/ask-answer-question/ask-answer-question.js
const service = require('../../util/service/service')
const toast = require('../../util/toast/toast')
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
		  errTips: '',
		  isSubmitDisabled: true,
		  isSubmitting: '',
  	},

	methods: {
		onFocus: function (e) {
			this.setData({
				errTips: ''
			})
		},
	
		onInput: function (e) {
			let value = e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
			this.setData({
				isSubmitDisabled: value.length === 0,
				content: value
			})
		},

		onFormSubmit: function(e) {
			let content = this.data.content
			this.setData({
				isSubmitting: true
			})
			if (content.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
				this.setData({
					errTips: '输入为空'
				})
			}else {
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
			}
		},
	
		onNavigateBack: function() {
			let url = '/app/page/bond-detail/bond-detail?from=share&bid=' + this.data.bondId +'&uid=' + this.data.userId + '&tid=question'
			wx.navigateBack({
				url: url
			})
		},

		onSuccess: function () {
			toast.showToast('提交成功')
			this.setData({
				isSubmitting: false,
				isSubmitDisabled: true
			})
			setTimeout(()=>{
				this.onNavigateBack()
			}, 1600)	
		},
	
		onFailed: function (result) {
			this.setData({
				isSubmitting: false
			})
			if (result && result.data && result.data.ret) {
				let ret = String(result.data.ret)
				if (ret === '-2') {
					toast.showFailedToast('非V用户不可以' + this.data.isAsk ? '提问' : '回答')
				} else if (ret === '-3') {
					toast.showFailedToast('操作太频繁，请明天再试')
				} else {
					toast.showFailedToast('操作失败，请稍后再试')
				}
			} else {
				toast.showFailedToast('系统繁忙，请稍后再试')
			}
		}
	}
})
