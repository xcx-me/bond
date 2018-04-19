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
		value: [],
		observer: function(newVal, oldVal) {
			//
		}
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
	bondSimpleName: '',
	isShowModifyPallet: false,
	modifyPalletTop: 0,
	winHeight: 0,
	rpx: 0,
	modifyIndex: 0,
	isClicking: false
  },


  ready: function () {
	let that = this
	wx.getSystemInfo({
		success: function(res) {
			that.data.rpx = res.windowWidth / 750
			that.data.winHeight = res.windowHeight - (that.data.rpx* 128)	
		}
	})
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
		if (this.data.isClicking) {
			return 
		}
		this.data.isClicking = true
		this.hiddenModifyPallet()
		request(config.NEW_BOND.accumulateClick, {user_id: uid, bond_simple_name: bondSimpleName})
		
		let that = this
		setTimeout(()=>{
			that.data.isClicking = false
			let virtualUid = this.data.isMine ? '0' : uid
			let url = '/app/page/bond-detail/bond-detail?bid=' + bondId +'&uid=' + virtualUid
			from === 'detail' ? wx.redirectTo({url: url}) : wx.navigateTo({url: url})
		}, 200)
	},

	onModifyBondEvent: function(e) {
		let offsetTop = e.detail.offsetTop - 40 * this.data.rpx
		if (offsetTop > this.data.winHeight - 30) {
			offsetTop = this.data.winHeight - 50
		}

		console.log('onModifyBondEvent...', e)
		this.setData({
			isShowModifyPallet: true,
			modifyPalletTop: offsetTop,
			bondSimpleName: e.detail.bondSimpleName,
			bondId: e.detail.bondId
		})
		
		this.triggerEvent('modifyBondEvent', e.detail)
	},

	onModifySaleInfo: function() {
		this.hiddenModifyPallet()
		wx.navigateTo({
			url: '/app/page/edit-sale-info/edit-sale-info?bid=' + this.data.bondId
		})
	},

	onModifyBondDetail: function() {
		this.hiddenModifyPallet()
		wx.navigateTo({
			url: '/app/page/quotation/quotation?bname=' + this.data.bondSimpleName
		})
	},

	onDeleteBondEvent: function (e) {
		this.hiddenModifyPallet()
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
	},

	hiddenModifyPallet() {
		this.setData({
			isShowModifyPallet: false
		})
	},

	onTouchMove: function() {
		this.hiddenModifyPallet()
	}
  }
})
