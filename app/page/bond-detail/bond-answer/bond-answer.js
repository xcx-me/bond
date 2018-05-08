// app/page/bond-detail/bond-answer/bond-answer.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const Authentication = require('../../../util/authentication/authentication')
const Click = require('../../../util/click/click')
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

  /**
   * 组件的属性列表
   */
  properties: {
	answerList: {
		type: Array,
		value: []
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
	onThumb: function (e) {
		Click.check(() => {
			Authentication.check(() => {
				let answerId = e.currentTarget.dataset.id
				request(config.NEW_BOND.thumbQuestion, {answer_id: answerId}).then((result)=>{
					this.triggerEvent('thumbEvent')
					Click.enable()
				}).catch(()=>{
					Click.enable()
				})
			})
		})	
	}
  }
})
