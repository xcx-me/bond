// app/ui/single-bond/single-bond.js
const bond =require('../../util/store/bond.js')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bondInfo: {
		type: Object,
		value: {}
	},
	bondId: {
		type: String,
		value: '',
		observer: function (newVal, oldVal) {
			// console.log('observer....', newVal, oldVal)
		}
	},
	isMine: {
		type: Boolean,
		value: ''
	},
	from: {
		type: String,
		value: ''
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	bondFieldList: bond.bondFieldList
  },

  ready: function () {
	// console.log('ready...', this.data.bondInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {
	doNavigator: function (e) {
		let bid = e.currentTarget.dataset.bid
		let uid = this.data.isMine ? '0' : e.currentTarget.dataset.uid
		let bname = e.currentTarget.dataset.bname
		request(config.NEW_BOND.accumulateClick, {user_id: uid, bond_simple_name: bname})
		let url = '/app/page/bond-detail/bond-detail?bid=' + bid + '&uid=' + uid
		console.log('single-bond:', url)
		wx.navigateTo({
			url: url
		})
	},

	onDeleteBond: function (e) {
		let bname = e.currentTarget.dataset.bname
		this.triggerEvent('deleteBondEvent', bname)
	}
  }
})
