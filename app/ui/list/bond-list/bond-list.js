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
		value: []
	},
	detailUrl: {
		type: String,
		value: ''
	},
	userId: {
		type: String,
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
	doClickBond: function(e){
		let bondSimpleName = e.currentTarget.dataset.name
		let userId = e.currentTarget.dataset.uid
		// var pages=getCurrentPages()
		// console.log(this.data.from, pages)
		request(config.NEW_BOND.accumulateClick, {user_id: userId, bond_simple_name: bondSimpleName})
	}
  }
})
