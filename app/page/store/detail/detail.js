// components/Dialog/dialog.js
var detail =require('../../../util/store/detail.js')
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const Click = require('../../../util/click/click')
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

		setUnConfirmedUserInfo: function (detail) {
			detail.from = 'wx-open-data'
			detail.sale_name = 'userNickName'
			detail.face_url = 'userAvatarUrl'
			detail.company_simple_name = '机构：--'
			this.updateStoreDetail(detail)
		},

		getStoreDetail: function (userId) {
			if (this.data.isRegistered) { // 已开店
				request(config.NEW_BOND.storeDetail, {user_id: userId}).then((result) => {
					this.updateStoreDetail(result.retdata)
				})
			} else { // 未开店
				request(config.NEW_BOND.cardInfo, {}).then((result) => {
					let detail = {
						is_myself: '1',
						is_qtrade: '2',
						face_url: result.faceurl,
						v_user: result.iscomfirmed,
						share_num: '0',
						click_num: '0',
						onsale_bond: '0',
						history_bond: '0',
						user_id: '0',
						url: this.data.navigatorUrl,
						sale_name: result.realname,
						company_simple_name: result.company.simpleName
					}
					if (result.iscomfirmed === '1') { //已认证
						this.updateStoreDetail(detail)
					} else {  // 未认证，获取微信昵称和头像
						this.setUnConfirmedUserInfo(detail)
					}
				})
			}
		},

		doClick () {
			if (this.data.navigatorUrl) {
				Click.check(() => {
					wx.navigateTo({
						url: this.data.navigatorUrl,
						complete: () => {
							Click.enable()
						}
					})
				})
			}
		}
	}
  })