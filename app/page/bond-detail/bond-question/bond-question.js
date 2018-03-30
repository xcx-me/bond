// app/page/bond-detail/bond-question/bond-question.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},

  	properties: {
		bondId: {
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
		questionTotal: 0,
  	},

  	ready: function () {
		this.getQuestionList()
  	},

  	methods: {
		getQuestionList: function () {
			request(config.NEW_BOND.questionQuery, {
				bond_id: this.data.bondId
			}).then((result) => {
				if (String(result.data.ret) === '0') {
					let questionList = result.data.retdata.ask_array
					let questionTotal = questionList.length
					this.setData({
						questionList: questionList,
						questionTotal: questionTotal
					})

					this.triggerEvent('updateTotalEvent', questionTotal)
				}
			})
		}
	}
})
