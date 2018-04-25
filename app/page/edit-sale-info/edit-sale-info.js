// app/page/edit-sale-info/edit-sale-info.js
const service = require('../../util/service/service')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bondId: '',
		saleInfo: {},
		fieldList: [
			{name: 'little_range', label: '小区间(%)', types: [{name:'little_left', formType: 'input', type: 'digit', maxlength:7, 'placeholder': '%'}, {name:'little_right', formType: 'input', type: 'digit', maxlength:7, 'placeholder': '%'}]},
			{name: 'early_end', label: '提前截标', types:[{name:'early_end', formType: 'input', type: 'number', maxlength:3, 'placeholder': '请输入提前截标',postfix: '分钟'}]},
			{name: 'sale_type', label: '销售方式', types:[{name:'sale_type', formType: 'checkbox', items: [{label: '分销', value: '1'},{label: '上市', value: '2'}]}]}
		],
		isSubmitDisabled: true,
		loading: true,
		saveValue: {
			little_left: '',
			little_right: '',
			early_end: '',
			sale_type: ''
		},
		warningShowText: false,
		warningText: '格式输入错误，请重新输入',
		hightlight: false
	},

	getSaleInfo: function(bondId) {
		service.getSaleInfo(bondId, (result)=>{
			this.setData({
				saleInfo: result.data.retdata,
				saveValue: {
					bond_simple_name: result.data.retdata.bond_simple_name,
					little_left: result.data.retdata.little_left,
					little_right: result.data.retdata.little_right,
					early_end: result.data.retdata.early_end,
					sale_type: result.data.retdata.sale_type
				},
				loading: false
			})
		})
	},

	onInput: function(e) {
		let value = e.detail.value
		let saveValue = this.data.saveValue
		let name = e.currentTarget.dataset.name

		if (name === 'little_left' || name === 'little_right') {
			let reg = /^\d{0,2}(\.\d{0,4})?$/g
			if (reg.test(value)) {
				if (value !== '' && value.substring(0, 1) === '.') {
					value = ''
				}
				saveValue[name] = value
			}
		}else {
			saveValue[name] = value
		}

		if (value.length > 0) {
			this.setData({
				isSubmitDisabled: false,
				saveValue: saveValue,
				hightlight: false
			})
		}
	},

	onCheckboxChange: function(e) {
		let value = e.detail.value
		let saveValue = this.data.saveValue
		let name = e.currentTarget.dataset.name
		saveValue[name] = value.join('|')
		if (value.length > 0) {
			this.setData({
				isSubmitDisabled: false,
				saveValue: saveValue
			})
		}
	},

	onFormSubmit: function(e) {
		let curValue = this.data.saveValue
		if (Number(curValue.little_left) > Number(curValue.little_right) && curValue.little_left !=='') {
			this.setData({
				warningShowText: true,
				hightlight: true
			})
			return
		}

		service.modNewBondDetail(this.data.saveValue, (result) => {
			wx.navigateBack()
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let bondId = options.bid
		this.setData({
			bondId: bondId
		})
		this.getSaleInfo(bondId)	
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})