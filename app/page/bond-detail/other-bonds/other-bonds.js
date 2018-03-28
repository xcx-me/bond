// app/page/bond-detail/other-bonds/other-bonds.js
const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')

Component({
  properties: {
	bondId: {
		type: String,
		value: ''
	},
	userId: {
		type: String,
		value: ''
	},
	detailUrl: {
		type: String,
		value: ''
	}
  },

  data: {
	bondList: []
  },

  ready: function () {
	this.getBondList()
  },

  methods: {
	getBondList: function () {
		request(config.NEW_BOND.newBondList, {
			bond_id: this.data.bondId,
			user_id: this.data.userId,
			offset: 0,
			limit: 3,
			used_for_management: '0'
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					bondList: result.data.retdata.bond_list
				})
			}
		})
	}
  }
})
