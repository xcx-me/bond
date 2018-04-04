// app/page/bond-detail/bond-answer/bond-answer.js
const service = require('../../../util/service/service')

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
		let answerId = e.currentTarget.dataset.id
		service.doThumb(answerId, ()=>{
			this.triggerEvent('thumbEvent')
		})
	}
  }
})
