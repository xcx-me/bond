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
	bondFieldList: bond.bondFieldList,
	maxSeller: 3
  },

  ready: function () {
	console.log('ready...', this.data.bondInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {
	onDeleteBond: function (e) {
		let bname = e.currentTarget.dataset.bname
		this.triggerEvent('deleteBondEvent', bname)
	}
  }
})
