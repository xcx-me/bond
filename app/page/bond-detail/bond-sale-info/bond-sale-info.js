// app/page/bond-detail/bond-sale-info/bond-sale-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bondSaleInfo: {
		type: Array,
		value: [],
		observer: function (newVal, oldVal) {
			console.log('ob..', newVal, oldVal)
		}
	},
	
	isQtrade: {
		type: Boolean,
		value: false,
	},

	fieldList: {
		type: Array,
		value: []
	},

	vUrl: {
		type: String,
		value: ''
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	
  },

  ready: function () {
	console.log('ready....', this.data.bondSaleInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
