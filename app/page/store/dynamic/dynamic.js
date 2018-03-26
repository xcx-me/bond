// app/ui/store/dynamic/dynamic.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	dynamicList: {
		type: Array,
		value: []
	},
	detailUrl: {
		type: String,
		value: ''
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  onLoad: function(options) {
	console.log(options)
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
