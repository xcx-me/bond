// app/page/edit-sale-info/edit-sale-info.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const toast = require('../../util/toast/toast')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bondId: '',
		fieldList: [
			{name: 'little_range', label: '小区间(%)', types: [{name:'little_left', formType: 'input', type: 'digit', maxlength:7, 'placeholder': '%'}, {name:'little_right', formType: 'input', type: 'digit', maxlength:7, 'placeholder': '%'}]},
			{name: 'early_end', label: '提前截标', types:[{name:'early_end', formType: 'input', type: 'number', maxlength:3, 'placeholder': '请输入提前截标',postfix: '分钟'}]},
			{name: 'sale_type', label: '销售方式', types:[{name:'sale_type', formType: 'checkbox', items: [{label: '分销', value: '1'},{label: '上市', value: '2'}]}]}
		],
		isSubmitDisabled: true,
		isSubmitting: '',
		loading: true,
		saleInfo: {
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
		request(config.NEW_BOND.getSaleInfo, {bond_id: bondId}).then((result)=>{
			let retData =  result.retdata
			this.setData({
				saleInfo: {
					bond_simple_name: retData.bond_simple_name,
					little_left: retData.little_left,
					little_right: retData.little_right,
					early_end: retData.early_end,
					sale_type: retData.sale_type
				},
				loading: false
			})
		})
	},

	onInput: function(e) {
		let value = e.detail.value
		let saleInfo = this.data.saleInfo
		let name = e.currentTarget.dataset.name
		
		if (name === 'little_left' || name === 'little_right') {
			let reg = /^\d{0,2}(\.\d{0,4})?$/g
			if (reg.test(value)) {
				if (value !== '' && value.substring(0, 1) === '.') {
					value = ''
				}
				value = value.replace(/[^\d.]/g, '')
				value = value.replace(/\.{2,}/g, '.')
				value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
				if (value.indexOf('.') < 0 && value !== '' && value.substring(0, 1) === '0' && value.length === 2) {
					value = value.substring(1, value.length)
				}
				saleInfo[name] = value
			}
		}else if (name === 'early_end') {
			saleInfo[name] = parseInt(value, 10)
        } else {
			saleInfo[name] = value
        }

		if (value.length > 0) {
			this.setData({
				isSubmitDisabled: false,
				saleInfo: saleInfo,
				hightlight: false
			})
		}
	},

	onCheckboxChange: function(e) {
		let value = e.detail.value
		let saleInfo = this.data.saleInfo
		let name = e.currentTarget.dataset.name
		saleInfo[name] = value.join('|')
		if (value.length > 0) {
			this.setData({
				isSubmitDisabled: false,
				saleInfo: saleInfo
			})
		}
	},

	onFormSubmit: function(e) {
		let curValue = this.data.saleInfo
		if (Number(curValue.little_left) > Number(curValue.little_right) && curValue.little_left !=='') {
			this.setData({
				warningShowText: true,
				hightlight: true
			})
			return
		}

		this.setData({
			isSubmitting: true
		})

		request(config.NEW_BOND.modNewBondDetail, this.data.saleInfo, true).then((result) => {
			this.setData({
				isSubmitting: false,
				isSubmitDisabled: true,
			})
			if (String(result.ret) === '0') {
				toast.showToast('提交成功')
				this.setData({
					saleInfo: {
						bond_simple_name: this.data.saleInfo.bond_simple_name,
						little_left: '',
						little_right: '',
						early_end: '',
						sale_type: ''
					}
				})
				setTimeout(()=>{
					wx.navigateBack()
				}, 1600)
			}
		}).catch(()=> {
			this.setData({
				isSubmitting: false
			})
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