// components/Dialog/dialog.js
var detail =require('../../../util/store/detail.js')

Component({
	options: {
	  multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	/**
	 * 组件的属性列表
	 * 用于组件自定义设置
	 */
	properties: {
		storeDetail: {
			type: Object,
			value: { 
				history_bond: "0", 
				onsale_bond: "0", 
				click_num: "0", 
				share_num: "0"
			},
		}
	},
  
	/**
	 * 私有数据,组件的初始数据
	 * 可用于模版渲染
	 */
	data: {
		displayFieldList: detail.displayFieldList
	},
  
	/**
	 * 组件的方法列表
	 * 更新属性和数据的方法与更新页面数据的方法类似
	 */
	methods: {
	  _propertyChange: function(newVal, oldVal) {

    }
	}
  })