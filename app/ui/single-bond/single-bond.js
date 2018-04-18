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
	adminBondFieldList: bond.bondAdminFieldList,  
	bondFieldList: bond.bondFieldList,
	maxSeller: 3
  },

  ready: function () {
	// console.log('ready...', this.data.bondInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {
	onDeleteBond: function (e) {
		let bname = e.currentTarget.dataset.bname
		this.triggerEvent('deleteBondEvent', bname)
	},

	doClickBondItem: function (e) {
		let name = e.currentTarget.dataset.name
		let bondSimpleName = e.currentTarget.dataset.bondname
		if (name === 'icon-modify') {
			console.log(e)
			this.triggerEvent('modifyBondEvent', {bondSimpleName: bondSimpleName, offsetTop: e.detail.y, bondId: this.data.bondInfo.bond_id})
		} else if (name === 'icon-delete') {
			this.triggerEvent('deleteBondEvent', bondSimpleName)
		}
	}
  }
})
