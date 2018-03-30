// components/Dialog/dialog.js
var detail =require('../../../util/store/detail.js')
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
var app = getApp()

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

		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal){
				if (newVal) {
					this.getStoreDetail(this.data.userId)
				}
			}
		},
		
		navigatorUrl: {
			type: String,
			value: ''
		},
	
		vUrl: {
			type: String,
			value: ''
		},
		
		isHiddenSeller: {
			type: Boolean,
			value: false
		},

		needNavigatorIndex: {
			type: Boolean,
			value: false
		}
	},
  
	data: {
		storeDetail: {
			history_bond: "0",
        	onsale_bond: "0",
       	 	click_num: "0",
        	share_num: "0"
		},
		displayFieldList: detail.displayFieldList
	},
  
	ready: function () {
		this.getStoreDetail(this.data.userId)
	},

	methods: {
		getStoreDetail: function (userId) {
			request(config.NEW_BOND.storeDetail, {user_id: userId}).then((result) => {
				if (String(result.data.ret) === '0') {
					let detail = result.data.retdata
					this.setData({
						storeDetail: detail
					})
					console.log('getStoreDetail....', userId)
					this.triggerEvent('event', detail)
				}
			})
		}
	}
  })