// app/page/bond-detail/bond-question/bond-question.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const Authentication = require('../../../util/authentication/authentication')
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},

  	properties: {
		currentTabId: {
			type: String,
			value: ''
		},
		bondId: {
			type: String,
			value: ''
		},
		userId: {
			type: String,
			value: ''
		},
		loadingStoreDetail: {
			type: Boolean,
			value: false,
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
		loading: true,
		questionList: [],
		bondSimpleName: ''
  	},

  	ready: function () {  
  	},

  	methods: {
		getQuestionList: function () {
			request(config.NEW_BOND.questionQuery, {bond_id: this.data.bondId}).then((result)=> {
				let retData =  result.retdata
				let questionList = retData.ask_array
				let questionTotal = questionList.length
				this.setData({
					loading: false,
					questionList: questionList,
					bondSimpleName: retData.bond_simple_name
				})
				this.triggerEvent('updateTotalEvent', questionTotal)
			})
		},

		onAsk: function () {
			Authentication.check(() => {
				let url = '/app/page/ask/ask?bid=' + this.data.bondId +'&bname=' + this.data.bondSimpleName +'&uid=' + this.data.userId
				wx.navigateTo({
					url: url
				})
			})
		},

		onAnswer: function (e) {
			Authentication.check(() => {
				let askId = e.currentTarget.dataset.id
				let question = e.currentTarget.dataset.question
				let url = '/app/page/answer/answer?bid=' + this.data.bondId +'&askid=' + askId + '&question=' + question+ '&uid=' + this.data.userId
				wx.navigateTo({
					url: url
				})
			})	
		},

		_onThumbEvent: function () {
			this.getQuestionList()
		}
	}
})
