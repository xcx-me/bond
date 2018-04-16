// app/page/bond-detail/bond-info/bond-info.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const bond =require('../../../util/store/bond.js')

Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

	properties: {
		bondId: {
			type: String,
			value: ''
		},
		isMyStore: {
			type: Boolean,
			value: false,
		},
		needUpdate: {
			type: Boolean,
			value: false,
			observer: function(newVal, oldVal){
				if (newVal) {
					this.getBondDetail()
				}
			}
		},
	},

	data: {
		bondInfoFieldList: bond.bondInfoFieldList,
		bondInfo: {},
		attached: 'gag34|gare3'
	},

  	ready: function () {
	  	console.log('bond-info', this.data.isMyStore)
		this.getBondDetail()
  	},

  /**
   * 组件的方法列表
   */
  methods: {
	getBondDetail: function () {
		request(config.NEW_BOND.newBondDetail, {bond_id: this.data.bondId}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					bondInfo: result.data.retdata
				})
			}
		})
	},

	onEditBond: function () {
		wx.navigateTo({
			url: '/app/page/quotation/quotation?bname=' + this.data.bondInfo.bond_simple_name
		})
	}
  }
})
