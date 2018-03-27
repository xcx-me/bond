// app/ui/single-bond/single-bond.js
var bond =require('../../util/store/bond.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bondInfo: {
		type: Object,
		value: {}
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	bondFieldList: bond.bondFieldList
  },

  ready: function () {
	//   console.log(this.data.bondInfo)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
