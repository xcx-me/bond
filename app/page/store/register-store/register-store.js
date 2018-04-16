// app/page/store/register-store/register-store.js
const commonUtil = require('../../../util/common')
const service = require('../../../util/service/service')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
	
	doOpenStore: function() {
		console.log('doopenstore')
		service.doOpenStore((result) => {
			wx.navigateTo({
				url: '/app/page/register-store-complete/register-store-complete'
			})
		}, () => {
			console.log('failed')
			commonUtil.showToast('操作失败，请稍后再试', 'none', 1000)
		})
  	},
  }
})