// app/page/bond-detail/bond-question/bond-question.js
const service = require('../../../util/service/service')
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},

  	properties: {
		bondId: {
			type: String,
			value: ''
		},
		userId: {
			type: String,
			value: ''
		},
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal){
				if (newVal) {
					this.getQuestionList()
				}
			}
		},
  	},

  	data: {
		questionList: [],
		bondSimpleName: ''
  	},

  	ready: function () {
		this.getQuestionList()
  	},

  	methods: {
		getQuestionList: function () {
			service.getQuestionList(this.data.bondId, (result)=> {
				let questionList = result.data.retdata.ask_array
				let questionTotal = questionList.length
				this.setData({
					questionList: questionList,
					bondSimpleName: result.data.retdata.bond_simple_name
				})
				this.triggerEvent('updateTotalEvent', questionTotal)
			})
		},
		onAsk: function () {
			let url = '/app/page/ask/ask?bid=' + this.data.bondId +'&bname=' + this.data.bondSimpleName +'&uid=' + this.data.userId
			wx.navigateTo({
				url: url
			})
		},
		onAnswer: function (e) {
			let askId = e.currentTarget.dataset.id
			let url = '/app/page/answer/answer?bid=' + this.data.bondId +'&askid=' + askId +'&uid=' + this.data.userId
			wx.navigateTo({
				url: url
			})
		},
		_onThumbEvent: function () {
			this.getQuestionList()
		}
	}
})
