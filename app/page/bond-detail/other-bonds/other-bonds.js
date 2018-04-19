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
	bondList: {
		type: Array,
		value: []
	}
  },

  data: {
  },

  ready: function () {
  },

  methods: {
  }
})
