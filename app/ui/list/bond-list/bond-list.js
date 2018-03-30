// app/ui/list/bond-list/bond-list.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bondList: {
		type: Array,
		value: []
	},
	detailUrl: {
		type: String,
		value: ''
	},
	userId: {
		type: String,
		value: ''
	},
	uid: {
		type: String,
		value: ''
	},
	from: {
		type: String,
		value: ''
	},
	isMine: {
		type: Boolean,
		value: false
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
	doClickBond: function(e){
		let bondSimpleName = e.currentTarget.dataset.name
		let userId = e.currentTarget.dataset.uid
		request(config.NEW_BOND.accumulateClick, {user_id: userId, bond_simple_name: bondSimpleName})
	},

	_deleteBondEvent: function (e) {
		this.deleteBondName = e.detail
		this.dialog = this.selectComponent('#dialog')
		this.dialog.showDialog()
	},
  
	_cancelEvent: function () {
		this.dialog.hideDialog();
	},
  
	_confirmEvent: function () {
		this.triggerEvent('deleteBondEvent', this.deleteBondName)
		this.dialog.hideDialog();
	}
  }
})
