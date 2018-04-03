// app/page/market/stage-inquiry/stage-inquiry.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bondList: {
		type: Array,
		value: [],
		observer: function(newVal, oldVal) {
			console.log('consultation observer')
		}
	},
	needUpdate: {
		type:Boolean,
		value: false,
		observer: function(newVal, oldVal) {
			this._update()
		}
	}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

    ready: function () {
	  console.log('inquiry', this.data.bondList)
	},
	  
  /**
   * 组件的方法列表
   */
  methods: {
	_update: function() {
		console.log('2 update')
	}
  }
})
