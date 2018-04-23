// components/Dialog/dialog.js
var detail =require('../../../util/store/detail.js')
const service = require('../../../util/service/service')

Component({
	options: {
	  multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},

	/**
	 * 组件的属性列表
	 * 用于组件自定义设置
	 */
	properties: {
		userId: {
			type: String,
			value: ''
		},
		detail: {
			type: Object,
			value: '',
			observer: function(newVal, oldVal){
				if (Object.keys(this.data.detail).length > 0) {
					this.setData({
						loading: false,
						storeDetail: this.data.detail
					})
				}
			}
		},
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal){
				if (newVal) {
					this.getStoreDetail(this.data.userId)
				}
			}
		},

		isRegistered: {
			type: Boolean,
			value: false
		},
			
		navigatorUrl: {
			type: String,
			value: ''
		},
		isHiddenSeller: {
			type: Boolean,
			value: false
		}
	},
  
	data: {
		loading: true,
		storeDetail: {
			face_url: 'loading',
			history_bond: "0",
        	onsale_bond: "0",
       	 	click_num: "0",
        	share_num: "0"
		},
		displayFieldList: detail.displayFieldList
	},
  
	ready: function () {
		// this.getStoreDetail(this.data.userId)
	},

	methods: {
		updateStoreDetail: function(detail) {
			this.setData({
				loading: false,
				storeDetail: detail,
			})
			this.triggerEvent('event', detail)
		},

		getStoreDetail: function (userId) {
			console.log('getstoredetail.......')
			if (this.data.isRegistered) { // 已开店
				service.getStoreDetail(userId, (result) => {
					this.updateStoreDetail(result.data.retdata)
				}, () => {
				})
			} else { // 未开店
				service.getCardInfo((result) => {
					let detail = {
						is_myself: '1',
						is_qtrade: '2',
						face_url: result.data.faceurl,
						v_user: result.data.iscomfirmed,
						share_num: '0',
						click_num: '0',
						onsale_bond: '0',
						history_bond: '0',
						user_id: '0',
						url: this.data.navigatorUrl,
						sale_name: result.data.realname,
						company_simple_name: result.data.company.simpleName
					}
					// result.data.iscomfirmed = 2 // for debug
					if (result.data.iscomfirmed === '1') { //已认证
						this.updateStoreDetail(detail)
					} else {  // 未认证，获取微信昵称和头像
						let that = this
						wx.getUserInfo({  
							success: function(res){  
								let userInfo = res.userInfo
								detail.sale_name = userInfo.nickName
								detail.face_url = userInfo.avatarUrl
								detail.company_simple_name = '机构：--'
								that.updateStoreDetail(detail)
							},
							fail: function (res){
								that.updateStoreDetail(detail)
							}
						})  
					}
				})
			}
		},

		doClick () {
			if (this.data.navigatorUrl) {
				wx.navigateTo({
					url: this.data.navigatorUrl
				})
			}
		}
	}
  })