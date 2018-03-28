// app/page/bond-detail/bond-info/bond-info.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const bond =require('../../../util/store/bond.js')

Component({
	properties: {
		bondId: {
			type: String,
			value: ''
		}
	},

	data: {
		bondInfoFieldList: bond.bondInfoFieldList,
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
				console.log(result)
				this.setData({
					bondInfo: result.data.retdata
				})
			}
		})
	}
  }
})
