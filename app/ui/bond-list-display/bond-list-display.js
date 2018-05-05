// app/ui/list/bond-list/bond-list.js
const navigate = require('../../util/navigate/navigate')
const Authentication = require('../../util/authentication/authentication')

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
		navigate.toBondDetail(from, this.data.isMine, uid, bondId, bondSimpleName)
	},

	onModifyBondEvent: function(e) {
		this.showModifyModal(e.detail.bondSimpleName, e.detail.bondId)
	},

	showModifyModal: function (bondSimpleName, bondId) {
		Authentication.check(() => {
			let that = this
			wx.showActionSheet({
				itemList: ['修改销售信息', '修改债券详情'],
				success: function(res) {
					if (res.tapIndex === 0) {
						that.onModifySaleInfo(bondId)
					} else if (res.tapIndex === 1) {
						that.onModifyBondDetail(bondSimpleName)
					}
				},
				fail: function(res) {
				}
			})
		})
	},

	onModifySaleInfo: function(bondId) {
		Authentication.check(() => {
			wx.navigateTo({
				url: '/app/page/edit-sale-info/edit-sale-info?bid=' + bondId
			})
		})
	},

	onModifyBondDetail: function(bondSimpleName) {
		Authentication.check(() => {
			wx.navigateTo({
				url: '/app/page/quotation/quotation?bname=' + bondSimpleName
			})
		})
	},

	onDeleteBondEvent: function (e) {
		this.showDeleteModal(e.detail)
	},

	showDeleteModal(bondSimpleName) {
		Authentication.check(() => {
			let that = this
			wx.showModal({
				content: '请确定是否删除该债券？',
				confirmColor: '#2196F3',
				success: function (res) {
					if (res.confirm) {
						that.triggerEvent('doDeleteBondEvent', bondSimpleName)
					}

					if (res.cancel) {
						that.triggerEvent('doDeleteBondEvent', '')
					}
				}
			}) 
		})
	}
  }
})
