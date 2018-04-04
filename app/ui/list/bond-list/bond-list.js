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
	saleList: [],
	bondSimpleName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
	doClickBond: function(e){
		let {index} = e.currentTarget.dataset
		let bond = this.data.bondList[index]
		let {from,uid}= this.data
		let bondId = ''
		let bondSimpleName = bond ? bond.bond_simple_name : ''
		
		if (from === 'board') {
			let isQtrade = String(bond.is_qtrade) === '1'
			let saleList = bond.sale_array
			if (isQtrade || saleList.length === 1) {
				uid = saleList[0].user_id
				bondId = saleList[0].bond_id
			} else {
				this.setData({
					saleList: saleList,
					bondSimpleName: bondSimpleName
				})
				this.saleDialog = this.selectComponent('#sale-dialog')
				this.saleDialog.showDialog()
				return true
			}
		} else {
			uid = this.data.userId
			bondId = bond.bond_id
		}

		this.toDetail(from, uid, bondId, bondSimpleName)
	},

	toDetail: function (from, uid, bondId, bondSimpleName) {
		request(config.NEW_BOND.accumulateClick, {user_id: uid, bond_simple_name: bondSimpleName})
		let virtualUid = this.data.isMine ? '0' : uid
		let url = '/app/page/bond-detail/bond-detail?bid=' + bondId +'&uid=' + virtualUid
		from === 'detail' ? wx.redirectTo({url: url}) : wx.navigateTo({url: url})
	},

	_deleteBondEvent: function (e) {
		this.deleteBondName = e.detail
		this.deleteDialog = this.selectComponent('#delete-dialog')
		this.deleteDialog.showDialog()
	},
  
	_cancelDelEvent: function () {
		this.deleteDialog.hideDialog();
	},
  
	_confirmDelEvent: function () {
		this.triggerEvent('deleteBondEvent', this.deleteBondName)
		this.deleteDialog.hideDialog();
	},

	_cancelSelectSaleEvent:function () {
		this.saleDialog.hideDialog()
	},

	_confirmSelectSaleEvent: function (e) {
		let index = e.detail
		let sale = this.data.saleList[index] || ''
		if (sale) {
			let uid = sale.user_id
			let bondId = sale.bond_id
			this.toDetail(this.data.from, uid, bondId, this.data.bondSimpleName)
		}
		this.saleDialog.hideDialog()
	}
  }
})
