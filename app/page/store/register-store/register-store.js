// app/page/store/register-store/register-store.js
const toast = require('../../../util/toast/toast')
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const Authentication = require('../../../util/authentication/authentication')

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
		Authentication.checkAuthentication(() => {
			request(config.NEW_BOND.openMyShop, {}).then((result) => {
				wx.navigateTo({
					url: '/app/page/register-store-complete/register-store-complete'
				})
			}).catch(()=>{
				toast.showFailedToast()
			})
		})
  	},
  }
})
