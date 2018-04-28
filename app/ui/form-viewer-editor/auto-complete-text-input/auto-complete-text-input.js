const { request } = require('../../../util/ajax/ajax')
const config = require('../../../util/ajax/config')
const AutoCompleteTextInputUtil = require('./auto-complete-text-input-util')

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		fieldName: {
			type: String,
			value: ''
		},
		value: {
			type: Object,
			value: {
				text: '',
				agencyName: '',
				agencyId: ''
			}
		},
		label: {
			type: String,
			value: ''
		},
		placeholder: {
			type: String,
			value: ''
		},
		maxlength: {
			type: Number,
			value: -1
		},
		type: {
			type: String,
			value: 'text'
		},
		hasWarning: {
			type: Boolean,
			value: false
		},
		mandatory: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		ascNameListOpen: false,
		simpleNameList: [],
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleInputChange: function (e) {
			this.setData({
				ascNameListOpen: false
			})

			let currentTime = new Date().getTime()
			this.timeStamp_ = currentTime
			setTimeout(() => {
				if (this.timeStamp_ - currentTime === 0) {
					console.log('e.detail.value', e.detail.value)
					this.bondSimpleNameAssociate(e.detail.value) // 债券简称列表联想
				}
			}, 1000)

			this.triggerEvent('change', {
				fieldName: e.currentTarget.dataset.fieldName,
				value: {
					text: e.detail.value,
					agencyName: '',
					agencyId: ''
				}
			})
		},

		bondSimpleNameAssociate: function (curName) {
			let host = this

			request(config.GETAGENCY_LIST, {key_word: curName}).then((result) => {
				
				let resultData = result.org_list

				console.log('resultData.....', resultData)

				resultData.forEach((item) => {
					item.bond_simple_name = item.name
				})

				host.matchedList = resultData

				console.log('set host.matchedList', host.matchedList)

				if (curName !=='' && resultData.length > 0) {
					console.log('resultData', resultData)
					let nameArray = AutoCompleteTextInputUtil.parseAssociateBondSimpleName(curName, resultData)
					console.log('nameArray', nameArray)

					this.setData({
						ascNameListOpen: true,
						simpleNameList: nameArray
					})
					this.triggerEvent('changeFixedPageScroll', true)
				} else {
					console.log('has no itmes..')
					this.setData({
						ascNameListOpen: false,
						simpleNameList: []
					})
					this.triggerEvent('changeFixedPageScroll', false)
				}
			})
		},

		_selectAssociateBondName: function (e) {
			let matchedItem = this.matchedList.find((item) => {
				return item.name === e.detail
			})

			console.log('matched item', matchedItem)

			this.triggerEvent('change', {
				fieldName: this.properties.fieldName,
				value: {
					text: matchedItem.name,
					agencyName: matchedItem.simple_name,
					agencyId: matchedItem.id
				}
			})

			this.hideAssociateNameList()
		},

		_closeAssociateList: function () {
			this.hideAssociateNameList()
		},

		hideAssociateNameList: function () {
			this.setData({
				ascNameListOpen: false,
				simpleNameList: []
			})
			this.triggerEvent('changeFixedPageScroll', false)
		},
	}
})
