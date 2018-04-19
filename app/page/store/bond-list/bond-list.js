// app/page/store/bond-list/bond-list.js
const service = require('../../../util/service/service')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	uid:  {
		type: String,
		value: ''
	},
	userId: {
		type: String,
		value: ''
	},
	isMyStore: {
		type: Boolean,
		value: false
	},
	isQtrade: {
		type: Boolean,
		value: false	
	},
	needUpdate: {
		type: Boolean,
		value: false,
		observer: function(newVal, oldVal){
			if (newVal) {
				this.getBondList(this.data.uid, 10)
			}
		}
	},
  },

  /**
   * 组件的初始数据
   */
  data: {
	bondList: []
  },

  ready: function () {
	 // this.getBondList(this.data.uid, 10)
  },

  /**
   * 组件的方法列表
   */
  methods: {  
	getBondList: function(userId, len) {
		let offset = 0
		let limit = len < 10 ? 10: len
		service.getBondList({
			bond_id: '0',
			user_id: userId,
			offset: offset,
			limit: limit,
			type: this.data.isMyStore && this.data.uid === '0' ? 2 : 4 // 2 我的店铺 4他人店铺
		}, (result) => {
			console.log('store-bond-list:',  result.data.retdata.bond_list)
			this.setData({
				bondList: result.data.retdata.bond_list
			})
		})
	  },
	  
	  onDeleteBondEvent: function (e) {
		let bname = e.detail
		request(config.NEW_BOND.deleteBond, {
			bond_simple_name: bname
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.getBondList(this.data.uid, this.data.bondList.length)
			}
		})
	  }	
  }
})
