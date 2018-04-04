// app/page/bond-detail/other-bonds/other-bonds.js
const service = require('../../../util/service/service')
Component({
  properties: {
	bondId: {
		type: String,
		value: ''
	},
	uid: {
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
	needUpdate: {
		type: Boolean,
		value: false,
		observer: function(newVal, oldVal){
			if (newVal) {
				this.getBondList()
			}
		}
	},
  },

  data: {
	bondList: []
  },

  ready: function () {
	this.getBondList()
  },

  methods: {
	getBondList: function () {
		service.getBondList({
			bond_id: this.data.bondId,
			user_id: this.data.userId,
			offset: 0,
			limit: 3,
			used_for_management: '0'
		}, (result) => {
			this.setData({
				bondList: result.data.retdata.bond_list
			})
		})
	}
  }
})
