// app/ui/list/bond-list/bond-list.js
const navigate = require('../../util/navigate/navigate')

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
	},
	isModifying: {
		type: Boolean,
		value: false,
		observer: function(newVal, oldVal) {
			if (!newVal) {
				this.hiddenModifyPallet()
			}
		}
	},
	moreLoading: {
		type: Boolean,
		value: false
	},
	overLoaded: {
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
	modifyIndex: 0
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
		
		if (from === 'market') {
			let isQtrade = String(bond.is_qtrade) === '1'
			let saleList = bond.sale_array
			if (isQtrade || saleList.length === 1) {
				uid = saleList[0].user_id
				bondId = saleList[0].bond_id
			} else {
				this.triggerEvent('showSaleEvent', {
					saleList: saleList,
					bondSimpleName: bondSimpleName
				})
				return true
			}
		} else {
			uid = this.data.userId
			bondId = bond.bond_id
		}

		this.toDetail(from, uid, bondId, bondSimpleName)
	},

	toDetail: function (from, uid, bondId, bondSimpleName) {
		this.hiddenModifyPallet()
		navigate.toBondDetail(from, this.data.isMine, uid, bondId, bondSimpleName)
	},

	onModifyBondEvent: function(e) {
		let that = this
		wx.createSelectorQuery().selectViewport().scrollOffset(function(res){
			let index = e.detail.index 
			let itemHeight = 250 * that.data.rpx
			let marginTop = 128* that.data.rpx
			let offsetTop = index * itemHeight  + marginTop 
			if (offsetTop > res.scrollTop + that.data.winHeight - 50) {
				offsetTop = res.scrollTop + that.data.winHeight- 50
			}
			
			that.data.isModifying = true
			that.setData({
				isShowModifyPallet: true,
				modifyPalletTop: offsetTop,
				bondSimpleName: e.detail.bondSimpleName,
				bondId: e.detail.bondId
			})
			
			that.triggerEvent('modifyBondEvent', e.detail)
		}).exec()
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
		this.triggerEvent('willDeleteBondEvent')
		this.deleteBondName = e.detail
		this.deleteDialog = this.selectComponent('#delete-dialog')
		this.deleteDialog.showDialog()
	},
  
	_cancelDelEvent: function () {
		this.triggerEvent('doDeleteBondEvent', '')
		this.deleteDialog.hideDialog();
	},
  
	_confirmDelEvent: function () {
		this.triggerEvent('doDeleteBondEvent', this.deleteBondName)
		this.deleteDialog.hideDialog();
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
