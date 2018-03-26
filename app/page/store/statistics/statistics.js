// components/Dialog/dialog.js
var detail =require('../../../util/store/detail.js')
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

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
			value: '',
			observer: function(newVal, oldVal){}
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
					this.setData({
						storeDetail: result.data.retdata
					})
				}
			})
		}
	}
  })