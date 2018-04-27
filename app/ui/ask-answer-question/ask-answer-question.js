// app/ui/ask-answer-question/ask-answer-question.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

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
		  isShowRemainTotal: true,
		  remainTotal: 50,
  	},

	methods: {
		onFocus: function (e) {
			this.setData({
				errTips: '',
				isShowRemainTotal: true
			})
		},

		onBlur: function(e) {
			this.setData({
				isShowRemainTotal: false
			})
		},
	
		onInput: function (e) {
			let value = e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
			this.setData({
				isSubmitDisabled: value.length === 0,
				content: value,
				isShowRemainTotal: true,
				remainTotal: 50 - value.length
			})
		},

		onFormSubmit: function(e) {
			let content = this.data.content
			if (content.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
				this.setData({
					errTips: '输入为空'
				})
			}else {
				this.setData({
					isSubmitting: true
				})
				if (this.data.isAsk) {
					request(config.NEW_BOND.askQuestion, {
						bond_simple_name: this.data.bondSimpleName,
						content: this.data.content,
						shop_user_id: this.data.userId
					}, true).then((result)=>{
						if(String(result.ret) === '0') {
							this.onSuccess()
						} else {
							this.onFailed(result)
						}
					}).catch(()=>{
						this.onFailed(result)
					})
				} else {
					request(config.NEW_BOND.answerQuestion, {ask_id: askId, content: content}, true).then((result) => {
						if(String(result.ret) === '0') {
							this.onSuccess()
						} else {
							this.onFailed(result)
						}
					}).catch(()=>{
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
