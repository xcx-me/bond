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
		loading: true,
		bondInfo: {}
	},

  	ready: function () {
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
					loading: false,
					bondInfo: result.data.retdata
				})
				this.triggerEvent('getBondSimpleNameEvent', result.data.retdata.bond_simple_name)
			}
		})
	}
  }
})
