// app/page/store/register-store/register-store.js
const toast = require('../../../util/toast/toast')
const service = require('../../../util/service/service')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	type: {
		type: String,
		value: ''
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
	doOpenStore: function() {
		service.doOpenStore((result) => {
			wx.navigateTo({
				url: '/app/page/register-store-complete/register-store-complete'
			})
		}, () => {
			toast.showFailedToast()
		})
  	},
  }
})
